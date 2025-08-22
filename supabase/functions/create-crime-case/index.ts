
import type { TemplateContextDto } from '../_shared/crime-api-types.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  'Access-Control-Max-Age': '86400',
};

const CRIME_AI_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling CORS preflight request');
    return new Response(null, { 
      status: 200,
      headers: corsHeaders 
    });
  }

  try {
    console.log('Starting create-crime-case function...');
    
    if (!CRIME_AI_BASE_URL || !CRIME_AI_TOKEN) {
      console.error('Missing environment variables');
      throw new Error('Missing required environment variables');
    }

    console.log('Environment variables configured');

    let templateContext: TemplateContextDto;
    try {
      templateContext = await req.json();
      console.log('Template context received:', JSON.stringify(templateContext, null, 2));
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      throw new Error('Invalid JSON in request body');
    }

    // Validate template context structure
    if (!templateContext || !Array.isArray(templateContext.variables)) {
      console.error('Invalid template context structure:', templateContext);
      throw new Error('Invalid template context: variables array is required');
    }

    console.log('Creating crime case with template context:', templateContext);

    const url = `${CRIME_AI_BASE_URL}/crimecase`;
    console.log('Making request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(templateContext),
    });

    console.log('API response status:', response.status);
    console.log('API response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    // Extract Location header for task polling
    const locationHeader = response.headers.get('Location');
    console.log('Location header:', locationHeader);

    if (!locationHeader) {
      console.error('No Location header in response');
      throw new Error('Missing Location header in API response');
    }

    console.log('Successfully created crime case task');

    return new Response(JSON.stringify({ locationUrl: locationHeader }), {
      status: 202,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in create-crime-case function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  }
});
