
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting fetch-case-evidences function...');
    
    // Get the case ID from the URL path
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const caseId = pathSegments[pathSegments.length - 1];
    
    if (!caseId || caseId === 'fetch-case-evidences') {
      console.error('No caseId provided in URL path');
      return new Response(
        JSON.stringify({ error: 'Case ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching evidences for case ID: ${caseId}`);

    const crimeApiBaseUrl = Deno.env.get('CRIME_AI_API_BASE_URL');
    const crimeApiToken = Deno.env.get('CRIME_AI_API_TOKEN');

    if (!crimeApiBaseUrl || !crimeApiToken) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'API configuration missing' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const apiUrl = `${crimeApiBaseUrl}/crimecase/${caseId}/evidence`;
    console.log(`Making request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${crimeApiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ error: 'Case evidences not found' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const evidences = await response.json();
    console.log('Successfully fetched case evidences:', evidences);

    return new Response(
      JSON.stringify(evidences),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in fetch-case-evidences:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
