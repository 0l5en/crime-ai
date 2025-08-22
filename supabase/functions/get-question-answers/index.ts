
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import type { ResultSetQuestionAndAnswer } from "../_shared/crime-api-types.ts";

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

console.log('Starting get-question-answers function...');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept GET requests
  if (req.method !== 'GET') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed. Use GET.' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    console.log('Fetching question and answers from external API...');
    
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    // Extract interrogationId from path: /get-question-answers/{interrogationId}
    const interrogationId = pathSegments[pathSegments.length - 1];
    
    console.log(`Interrogation ID extracted from path: ${interrogationId}`);
    
    if (!interrogationId || interrogationId === 'get-question-answers') {
      throw new Error('interrogationId is required as path parameter');
    }

    const apiUrl = `${CRIME_AI_API_BASE_URL}/interrogation/${interrogationId}/question-and-answer`;
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

    const data: ResultSetQuestionAndAnswer = await response.json();
    console.log('Successfully fetched question and answers:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in get-question-answers function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
