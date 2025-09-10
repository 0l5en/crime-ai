import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Processing vacation rental crime case creation request...');

    const crimeAiApiBaseUrl = Deno.env.get('CRIME_AI_API_BASE_URL');
    const crimeAiApiToken = Deno.env.get('CRIME_AI_API_TOKEN');

    if (!crimeAiApiBaseUrl || !crimeAiApiToken) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'Configuration error: missing API credentials' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Parse the request body
    const requestBody = await req.json();
    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    // Make request to Crime AI API
    const response = await fetch(`${crimeAiApiBaseUrl}/crimecase-vacation-rental`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${crimeAiApiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log('Crime AI API Response Status:', response.status);
    console.log('Crime AI API Response Headers:', Object.fromEntries(response.headers.entries()));

    // Handle validation errors (400 status)
    if (response.status === 400) {
      const errorBody = await response.text();
      console.log('Validation error response body:', errorBody);
      
      let violations;
      try {
        violations = JSON.parse(errorBody);
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        violations = { violations: [{ message: 'Invalid request data', propertyPath: '' }] };
      }

      return new Response(JSON.stringify(violations), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Handle other error status codes
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Crime AI API error ${response.status}:`, errorText);
      
      return new Response(
        JSON.stringify({ error: `API request failed with status ${response.status}` }),
        { 
          status: response.status >= 500 ? 500 : response.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Extract location header for task tracking
    const locationHeader = response.headers.get('Location');
    console.log('Location header:', locationHeader);

    if (!locationHeader) {
      console.error('No Location header in successful response');
      return new Response(
        JSON.stringify({ error: 'Invalid response: missing location header' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Return the location URL for task tracking
    const responseData = { locationUrl: locationHeader };
    console.log('Returning response data:', responseData);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Unexpected error in create-crime-case-vacation-rental function:', error);
    
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});