
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

console.log('Starting list-interrogations function...');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching interrogations via external API...');
    
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    const personId = url.searchParams.get('personId');
    const referenceId = url.searchParams.get('referenceId');
    
    console.log('Query parameters:', { 
      userId, 
      personId,
      referenceId
    });

    const apiUrl = new URL(`${CRIME_AI_API_BASE_URL}/interrogation`);
    
    // Add query parameters to the API request
    if (userId) {
      apiUrl.searchParams.append('userId', userId);
    }
    if (personId) {
      apiUrl.searchParams.append('personId', personId);
    }
    if (referenceId) {
      apiUrl.searchParams.append('referenceId', referenceId);
    }

    console.log(`Making request to: ${apiUrl.toString()}`);

    const response = await fetch(apiUrl.toString(), {
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
      throw new Error(`API request failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully fetched interrogations:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in list-interrogations function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
