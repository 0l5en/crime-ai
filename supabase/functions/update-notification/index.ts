import { corsHeaders } from '../_shared/cors.ts';
import { NotificationDto } from '../_shared/crime-api-types.ts';

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'PATCH') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const notification: NotificationDto = await req.json();

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

    console.log(`Updating notification ${notification.id} for user ${notification.recipientId}`);

    const response = await fetch(
      `${CRIME_AI_API_BASE_URL}/notification`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notification),
      }
    );

    if (!response.ok) {
      console.error(`API request failed: ${response.status} ${response.statusText}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    console.log(`Successfully updated notification ${notification.id}`);

    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });

  } catch (error) {
    console.error('Error in update-notification function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});