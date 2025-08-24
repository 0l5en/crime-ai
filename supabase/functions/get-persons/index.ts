
import { corsHeaders } from '../_shared/cors.ts';
import type { ResultSetPerson } from '../_shared/crime-api-types.ts';

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL') || 'https://crime-ai.0l5en.de';

Deno.serve(async (req) => {
  console.log('Starting get-persons function...');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const caseId = pathParts[pathParts.length - 1];
    const personType = url.searchParams.get('personType');
    
    if (!caseId) {
      console.error('No case ID provided in URL');
      return new Response(
        JSON.stringify({ error: 'Case ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching persons for case ID: ${caseId}, personType: ${personType || 'all'}`);

    const crimeApiToken = Deno.env.get('CRIME_AI_API_TOKEN');
    
    if (!crimeApiToken) {
      console.error('CRIME_AI_API_TOKEN not found');
      return new Response(
        JSON.stringify({ error: 'API token not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    let apiUrl = `${CRIME_AI_API_BASE_URL}/crimecase/${caseId}/person`;
    if (personType) {
      apiUrl += `?personType=${encodeURIComponent(personType)}`;
    }
    
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
      if (response.status === 404) {
        console.log('Case not found');
        return new Response(
          JSON.stringify({ error: 'Case not found' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (response.status === 400) {
        console.log('Invalid parameters');
        return new Response(
          JSON.stringify({ error: 'Invalid parameters' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const persons: ResultSetPerson = await response.json();
    console.log(`Successfully fetched persons:`, persons);

    return new Response(
      JSON.stringify(persons),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in get-persons function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
