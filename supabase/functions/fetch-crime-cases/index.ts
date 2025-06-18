
import createFetchClient from "https://esm.sh/openapi-fetch@0.14.0";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import type { CrimeApiPaths } from "../_shared/crime-api-types.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching crime cases from external API...');
    
    const apiToken = Deno.env.get('CRIME_AI_API_TOKEN');
    const baseUrl = Deno.env.get('CRIME_AI_API_BASE_URL');
    
    if (!apiToken) {
      console.error('CRIME_AI_API_TOKEN not found');
      throw new Error('API token not configured');
    }
    
    if (!baseUrl) {
      console.error('CRIME_AI_API_BASE_URL not found');
      throw new Error('API base URL not configured');
    }

    // Create type-safe openapi-fetch client
    const client = createFetchClient<CrimeApiPaths>({
      baseUrl,
      headers: {
        'Authorization': `Bearer ${apiToken}`,
        'Accept': 'application/json',
      },
    });

    console.log('Making API request to /crimecase...');
    
    const { data, error } = await client.GET('/crimecase');

    if (error) {
      console.error('API Error:', error);
      throw new Error(`API request failed: ${JSON.stringify(error)}`);
    }

    console.log('Successfully fetched crime cases:', data?.items?.length || 0, 'items');

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-crime-cases function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        items: []
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
