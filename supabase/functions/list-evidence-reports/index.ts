
import { corsHeaders } from '../_shared/cors.ts';
import type { ResultSetEvidenceReport } from '../_shared/crime-api-types.ts';

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting list-evidence-reports function...');
    
    // Get the evidence ID from the URL path
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const evidenceId = pathSegments[pathSegments.length - 1];
    
    if (!evidenceId || evidenceId === 'list-evidence-reports') {
      console.error('No evidenceId provided in URL path');
      return new Response(
        JSON.stringify({ error: 'Evidence ID is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching evidence reports for evidence ID: ${evidenceId}`);

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

    const apiUrl = `${CRIME_AI_API_BASE_URL}/evidence-report?evidenceId=${evidenceId}`;
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
          JSON.stringify({ error: 'Evidence reports not found' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      throw new Error(`API request failed: ${response.status}`);
    }

    const evidenceReports: ResultSetEvidenceReport = await response.json();
    console.log('Successfully fetched evidence reports:', evidenceReports);

    return new Response(
      JSON.stringify(evidenceReports),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in list-evidence-reports:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
