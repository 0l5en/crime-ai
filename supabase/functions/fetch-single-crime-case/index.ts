
import { corsHeaders } from '../_shared/cors.ts';
import type { CrimeCaseDto } from '../_shared/crime-api-types.ts';

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting fetch-single-crime-case function...');
    
    // Get the case ID from the URL path instead of query parameters
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const caseId = pathSegments[pathSegments.length - 1]; // Get the last segment which should be the caseId
    
    if (!caseId || caseId === 'fetch-single-crime-case') {
      console.error('No caseId provided in URL path');
      return new Response(
        JSON.stringify({ error: 'Case ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching crime case with ID: ${caseId}`);

    if (!CRIME_AI_API_BASE_URL || !CRIME_AI_API_TOKEN) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'API configuration missing' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const apiUrl = `${CRIME_AI_API_BASE_URL}/crimecase/${caseId}`;
    console.log(`Making request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
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
          JSON.stringify({ error: 'Crime case not found' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const crimeCase: CrimeCaseDto = await response.json();
    console.log('Successfully fetched crime case:', crimeCase);

    return new Response(
      JSON.stringify(crimeCase),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in fetch-single-crime-case:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
