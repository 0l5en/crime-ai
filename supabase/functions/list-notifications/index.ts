import { corsHeaders } from '../_shared/cors.ts';
import { ResultSetNotification } from '../_shared/crime-api-types.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      console.error('Missing required userId parameter');
      return new Response(
        JSON.stringify({ error: 'Missing userId parameter' }),
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

    console.log(`Fetching notifications for user: ${userId}`);

    const response = await fetch(
      `${CRIME_AI_API_BASE_URL}/notification?userId=${encodeURIComponent(userId)}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data: ResultSetNotification = await response.json();
    
    console.log(`Successfully fetched ${data.items?.length || 0} notifications`);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in list-notifications function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});