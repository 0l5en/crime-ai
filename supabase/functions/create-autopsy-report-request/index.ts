import { corsHeaders } from '../_shared/cors.ts';
import { CreateAutopsyReportRequestDto } from '../_shared/crime-api-types.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const requestData: CreateAutopsyReportRequestDto = await req.json();

    if (!requestData.userId || !requestData.victimId) {
      console.error('Missing required fields in request body');
      return new Response(
        JSON.stringify({ error: 'Missing userId or victimId' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
    const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

    if (!CRIME_AI_API_BASE_URL || !CRIME_AI_API_TOKEN) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'Missing API configuration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Creating autopsy report request for user ${requestData.userId}, victim ${requestData.victimId}`);

    const response = await fetch(
      `${CRIME_AI_API_BASE_URL}/autopsy-report-request`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );

    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      if (response.status === 400) {
        return new Response(
          JSON.stringify({ error: 'Invalid request data' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      throw new Error(`API request failed: ${response.status}`);
    }

    console.log(`Successfully created autopsy report request`);

    return new Response(null, {
      status: 201,
      headers: corsHeaders,
    });

  } catch (error) {
    console.error('Error in create-autopsy-report-request function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});