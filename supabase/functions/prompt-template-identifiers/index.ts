
import createClient from "https://esm.sh/openapi-fetch@0.14.0";
import { corsHeaders } from "../_shared/cors.ts";
import type { CrimeApiPaths } from "../_shared/crime-api-types.ts";

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL') || "https://crime-ai.0l5en.de";
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting prompt template identifiers request');

    if (!CRIME_AI_API_TOKEN) {
      console.error('CRIME_AI_API_TOKEN not configured');
      return new Response(
        JSON.stringify({ error: 'API token not configured' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create API client
    const client = createClient<CrimeApiPaths>({
      baseUrl: CRIME_AI_API_BASE_URL,
      headers: {
        'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Calling Crime AI API for prompt template identifiers');

    // Call the API
    const { data, error } = await client.GET("/prompt-template-identifier");

    if (error) {
      console.error('Crime AI API error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch prompt template identifiers' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Successfully fetched prompt template identifiers:', data);

    return new Response(
      JSON.stringify(data),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
