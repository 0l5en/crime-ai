
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CrimeCase {
  title: string;
  description: string;
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

    console.log('Fetching OpenAPI specification...');
    
    // Fetch OpenAPI specification - NO Accept header (server doesn't accept it)
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
    console.log('OpenAPI spec fetched successfully');

    // Parse YAML to find the listCrimeCases endpoint
    // Simple parsing to find the path with operationId: listCrimeCases
    const lines = specText.split('\n');
    let currentPath = '';
    let foundEndpoint = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Look for path definitions
      if (line.startsWith('/') && line.endsWith(':')) {
        currentPath = line.replace(':', '');
      }
      
      // Look for operationId: listCrimeCases
      if (line === 'operationId: listCrimeCases') {
        foundEndpoint = true;
        break;
      }
    }

    if (!foundEndpoint || !currentPath) {
      console.error('Could not find listCrimeCases endpoint in OpenAPI spec');
      return new Response(JSON.stringify({ error: 'API endpoint not found' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Found endpoint:', currentPath);

    // Call the crime cases API with Accept header for JSON response
    const casesUrl = `https://crime-ai.0l5en.de${currentPath}`;
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

    // Extract only title and description, limit to 3 cases
    let cases: CrimeCase[] = [];
    
    if (Array.isArray(casesData)) {
      cases = casesData.slice(0, 3).map((caseItem: any) => ({
        title: caseItem.title || 'Untitled Case',
        description: caseItem.description || 'No description available',
      }));
    } else if (casesData.data && Array.isArray(casesData.data)) {
      cases = casesData.data.slice(0, 3).map((caseItem: any) => ({
        title: caseItem.title || 'Untitled Case',
        description: caseItem.description || 'No description available',
      }));
    } else {
      console.error('Unexpected API response format:', casesData);
      return new Response(JSON.stringify({ error: 'Unexpected API response format' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Returning ${cases.length} crime cases`);

    return new Response(JSON.stringify({ cases }), {
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
