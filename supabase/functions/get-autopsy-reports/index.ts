
import { corsHeaders } from '../_shared/cors.ts';
import type { ResultSetAutopsyReport } from '../_shared/crime-api-types.ts';

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL') || 'https://crime-ai.0l5en.de';

Deno.serve(async (req) => {
  console.log('Starting get-autopsy-reports function...');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const reportAuthorId = url.searchParams.get('reportAuthorId');
    const victimId = url.searchParams.get('victimId');
    
    if (!reportAuthorId || !victimId) {
      console.error('Missing required parameters: reportAuthorId or victimId');
      return new Response(
        JSON.stringify({ error: 'reportAuthorId and victimId are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Fetching autopsy reports for reportAuthorId: ${reportAuthorId}, victimId: ${victimId}`);

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

    const apiUrl = `${CRIME_AI_API_BASE_URL}/autopsy-report?reportAuthorId=${encodeURIComponent(reportAuthorId)}&victimId=${encodeURIComponent(victimId)}`;
    
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

    const autopsyReports: ResultSetAutopsyReport = await response.json();
    console.log(`Successfully fetched autopsy reports:`, autopsyReports);

    return new Response(
      JSON.stringify(autopsyReports),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in get-autopsy-reports function:', error);
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
