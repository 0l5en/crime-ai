
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
    const referenceType = url.searchParams.get('referenceType');
    
    // If we have a request body (for reference-based queries), parse it
    let bodyParams: any = {};
    if (req.method === 'POST' || req.body) {
      try {
        bodyParams = await req.json();
      } catch (e) {
        // Body might be empty, that's ok
      }
    }
    
    // Use body params if available, otherwise use URL params
    const finalUserId = bodyParams.userId || userId;
    const finalPersonId = bodyParams.personId || personId;
    const finalReferenceId = bodyParams.referenceId || referenceId;
    const finalReferenceType = bodyParams.referenceType || referenceType;
    
    console.log('Query parameters:', { 
      userId: finalUserId, 
      personId: finalPersonId,
      referenceId: finalReferenceId,
      referenceType: finalReferenceType
    });

    const apiUrl = new URL(`${CRIME_AI_API_BASE_URL}/interrogation`);
    
    if (finalUserId) {
      apiUrl.searchParams.append('userId', finalUserId);
    }
    if (finalPersonId) {
      apiUrl.searchParams.append('personId', finalPersonId);
    }
    if (finalReferenceId) {
      apiUrl.searchParams.append('referenceId', finalReferenceId);
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
      throw new Error(`API request failed: ${response.status}`);
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
