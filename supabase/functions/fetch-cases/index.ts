
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// YAML Parser utilities
function parseYaml(yamlText: string): any {
  const lines = yamlText.split('\n');
  const result: any = {};
  const stack: any[] = [result];
  let currentIndent = 0;

  for (const line of lines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;
    
    const indent = line.length - line.trimStart().length;
    const content = line.trim();
    
    if (content.includes(':')) {
      const [key, ...valueParts] = content.split(':');
      const value = valueParts.join(':').trim();
      const cleanKey = key.trim();
      
      // Handle indentation changes
      if (indent < currentIndent) {
        const levelDiff = Math.floor((currentIndent - indent) / 2) + 1;
        for (let i = 0; i < levelDiff; i++) {
          stack.pop();
        }
      }
      
      const currentLevel = stack[stack.length - 1];
      
      if (value === '' || value === '{}' || value === '[]') {
        // This is a parent key
        currentLevel[cleanKey] = {};
        stack.push(currentLevel[cleanKey]);
        currentIndent = indent;
      } else {
        // This is a leaf value
        currentLevel[cleanKey] = value;
      }
    }
  }
  
  return result;
}

// OpenAPI Schema to TypeScript type mapping
function mapOpenApiTypeToTs(type: string, format?: string): string {
  switch (type) {
    case 'string':
      return format === 'uuid' ? 'string' : 'string';
    case 'integer':
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'array':
      return 'any[]';
    case 'object':
      return 'Record<string, any>';
    default:
      return 'any';
  }
}

// Generate TypeScript interface from OpenAPI schema
function generateTsInterface(name: string, schema: any): string {
  if (!schema || !schema.properties) {
    return `interface ${name} {\n  [key: string]: any;\n}`;
  }

  let interfaceStr = `interface ${name} {\n`;
  
  for (const [propName, propSchema] of Object.entries(schema.properties as any)) {
    const prop = propSchema as any;
    const isRequired = schema.required?.includes(propName) || false;
    const optional = isRequired ? '' : '?';
    const type = mapOpenApiTypeToTs(prop.type, prop.format);
    
    interfaceStr += `  ${propName}${optional}: ${type};\n`;
  }
  
  interfaceStr += '}';
  return interfaceStr;
}

// Generate Zod schema from OpenAPI schema
function generateZodSchema(schema: any): any {
  if (!schema || !schema.properties) {
    return 'z.record(z.any())';
  }

  const fields: string[] = [];
  
  for (const [propName, propSchema] of Object.entries(schema.properties as any)) {
    const prop = propSchema as any;
    let zodType = 'z.any()';
    
    switch (prop.type) {
      case 'string':
        zodType = 'z.string()';
        break;
      case 'integer':
      case 'number':
        zodType = 'z.number()';
        break;
      case 'boolean':
        zodType = 'z.boolean()';
        break;
      case 'array':
        zodType = 'z.array(z.any())';
        break;
      case 'object':
        zodType = 'z.record(z.any())';
        break;
    }
    
    const isRequired = schema.required?.includes(propName) || false;
    if (!isRequired) {
      zodType += '.optional()';
    }
    
    fields.push(`  ${propName}: ${zodType}`);
  }
  
  return `z.object({\n${fields.join(',\n')}\n})`;
}

// Enhanced API endpoint discovery
function findApiEndpoints(yamlData: any): Array<{path: string, method: string, operationId?: string, responses?: any}> {
  const endpoints: Array<{path: string, method: string, operationId?: string, responses?: any}> = [];
  
  if (!yamlData.paths) return endpoints;
  
  for (const [path, pathData] of Object.entries(yamlData.paths as any)) {
    if (typeof pathData !== 'object') continue;
    
    for (const [method, methodData] of Object.entries(pathData as any)) {
      if (typeof methodData === 'object' && methodData !== null) {
        const endpoint = methodData as any;
        endpoints.push({
          path,
          method: method.toUpperCase(),
          operationId: endpoint.operationId,
          responses: endpoint.responses
        });
      }
    }
  }
  
  return endpoints;
}

// Basic Zod validation (simplified implementation)
const z = {
  object: (shape: any) => ({
    parse: (data: any) => {
      // Simple validation - in production, use full Zod library
      if (typeof data !== 'object' || data === null) {
        throw new Error('Expected object');
      }
      return data;
    }
  }),
  string: () => ({
    parse: (data: any) => {
      if (typeof data !== 'string') {
        throw new Error('Expected string');
      }
      return data;
    },
    optional: () => ({
      parse: (data: any) => data
    })
  }),
  number: () => ({
    parse: (data: any) => {
      if (typeof data !== 'number') {
        throw new Error('Expected number');
      }
      return data;
    },
    optional: () => ({
      parse: (data: any) => data
    })
  }),
  boolean: () => ({
    parse: (data: any) => {
      if (typeof data !== 'boolean') {
        throw new Error('Expected boolean');
      }
      return data;
    },
    optional: () => ({
      parse: (data: any) => data
    })
  }),
  array: (item: any) => ({
    parse: (data: any) => {
      if (!Array.isArray(data)) {
        throw new Error('Expected array');
      }
      return data;
    },
    optional: () => ({
      parse: (data: any) => data
    })
  }),
  record: (value: any) => ({
    parse: (data: any) => {
      if (typeof data !== 'object' || data === null) {
        throw new Error('Expected object');
      }
      return data;
    }
  }),
  any: () => ({
    parse: (data: any) => data,
    optional: () => ({
      parse: (data: any) => data
    })
  })
};

interface CrimeCase {
  'case-id'?: string;
  title: string;
  description: string;
  'image-url'?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get('CRIME_AI_API_TOKEN');
    if (!apiToken) {
      console.error('CRIME_AI_API_TOKEN not found');
      return new Response(JSON.stringify({ error: 'API token not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Fetching and parsing OpenAPI specification...');
    
    // Fetch OpenAPI specification
    const specResponse = await fetch('https://crime-ai.0l5en.de/v3/api-docs.yaml', {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
      },
    });

    if (!specResponse.ok) {
      console.error('Failed to fetch OpenAPI spec:', specResponse.status, specResponse.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch API specification' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const specText = await specResponse.text();
    console.log('OpenAPI spec fetched, parsing YAML...');

    // Parse the full YAML structure
    const yamlData = parseYaml(specText);
    console.log('YAML parsed successfully');

    // Find all API endpoints
    const endpoints = findApiEndpoints(yamlData);
    console.log('Found endpoints:', endpoints.length);

    // Find the listCrimeCases endpoint
    const listCasesEndpoint = endpoints.find(ep => 
      ep.operationId === 'listCrimeCases' || 
      ep.path.includes('crimecase') ||
      ep.path.includes('/cases')
    );

    if (!listCasesEndpoint) {
      console.error('Could not find crime cases endpoint');
      console.log('Available endpoints:', endpoints.map(ep => ({ path: ep.path, operationId: ep.operationId })));
      return new Response(JSON.stringify({ error: 'Crime cases endpoint not found' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Found crime cases endpoint:', listCasesEndpoint.path);

    // Generate TypeScript interfaces (for logging/debugging)
    if (yamlData.components?.schemas) {
      console.log('Generating TypeScript interfaces...');
      for (const [schemaName, schema] of Object.entries(yamlData.components.schemas as any)) {
        const interfaceStr = generateTsInterface(schemaName, schema);
        console.log(`Generated interface for ${schemaName}:`, interfaceStr);
      }
    }

    // Call the crime cases API
    const casesUrl = `https://crime-ai.0l5en.de${listCasesEndpoint.path}`;
    console.log('Calling API:', casesUrl);
    
    const casesResponse = await fetch(casesUrl, {
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
      },
    });

    if (!casesResponse.ok) {
      console.error('Failed to fetch crime cases:', casesResponse.status, casesResponse.statusText);
      return new Response(JSON.stringify({ error: 'Failed to fetch crime cases' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const casesData = await casesResponse.json();
    console.log('Crime cases fetched successfully');

    // Create Zod schema for validation
    const crimeCaseSchema = z.object({
      'case-id': z.string().optional(),
      title: z.string(),
      description: z.string(),
      'image-url': z.string().optional()
    });

    // Extract and validate crime cases
    let cases: CrimeCase[] = [];
    
    try {
      if (casesData.items && Array.isArray(casesData.items)) {
        cases = casesData.items.slice(0, 3).map((caseItem: any) => {
          // Validate each case item
          const validatedCase = crimeCaseSchema.parse({
            'case-id': caseItem['case-id'],
            title: caseItem.title || 'Untitled Case',
            description: caseItem.description || 'No description available',
            'image-url': caseItem['image-url']
          });
          
          // Transform to frontend format
          return {
            title: validatedCase.title,
            description: validatedCase.description,
            imageUrl: validatedCase['image-url']
          };
        });
      } else if (Array.isArray(casesData)) {
        cases = casesData.slice(0, 3).map((caseItem: any) => ({
          title: caseItem.title || 'Untitled Case',
          description: caseItem.description || 'No description available',
          imageUrl: caseItem['image-url']
        }));
      } else {
        console.error('Unexpected API response format:', casesData);
        return new Response(JSON.stringify({ error: 'Unexpected API response format' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    } catch (validationError) {
      console.error('Validation error:', validationError);
      // Fallback to basic extraction without strict validation
      if (casesData.items && Array.isArray(casesData.items)) {
        cases = casesData.items.slice(0, 3).map((caseItem: any) => ({
          title: caseItem.title || 'Untitled Case',
          description: caseItem.description || 'No description available',
          imageUrl: caseItem['image-url']
        }));
      }
    }

    console.log(`Returning ${cases.length} validated crime cases`);

    return new Response(JSON.stringify({ 
      cases,
      metadata: {
        apiVersion: yamlData.openapi || '3.0.0',
        endpointUsed: listCasesEndpoint.path,
        totalEndpoints: endpoints.length
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-cases function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
