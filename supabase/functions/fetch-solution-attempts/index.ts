
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import type { ResultSetSolutionAttempt } from "../_shared/crime-api-types.ts";

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

console.log('Starting fetch-solution-attempts function...');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching solution attempts from external API...');
    
    const { caseId, userId, success } = await req.json();
    console.log(`Case ID: ${caseId}, User ID: ${userId}, Success: ${success}`);
    
    if (!caseId) {
      throw new Error('caseId is required');
    }

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (userId) queryParams.append('user-id', userId);
    if (success !== undefined) queryParams.append('success', success);

    const apiUrl = `${CRIME_AI_API_BASE_URL}/crimecase/${caseId}/solution-attempt${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
    console.log(`Making request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: ResultSetSolutionAttempt = await response.json();
    console.log('Successfully fetched solution attempts:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in fetch-solution-attempts function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
