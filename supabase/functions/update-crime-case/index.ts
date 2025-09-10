import createFetchClient from "https://esm.sh/openapi-fetch@0.14.0";
import { corsHeaders } from '../_shared/cors.ts';
import { CrimeApiPaths } from '../_shared/crime-api-types.ts';

Deno.serve(async (req) => {
  console.log('Update crime case request:', req.method, req.url);

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (req.method !== 'PATCH') {
      throw new Error(`Method ${req.method} not allowed`);
    }

    // Get case ID from URL path
    const url = new URL(req.url);
    const pathSegments = url.pathname.split('/');
    const caseId = pathSegments[pathSegments.length - 1];

    if (!caseId) {
      throw new Error('Crime case ID is required');
    }

    console.log('Updating crime case ID:', caseId);

    const requestBody = await req.json();
    console.log('Update request body:', requestBody);

    // Get API configuration from environment
    const crimeAiApiBaseUrl = Deno.env.get('CRIME_AI_API_BASE_URL');
    const crimeAiApiToken = Deno.env.get('CRIME_AI_API_TOKEN');

    if (!crimeAiApiBaseUrl || !crimeAiApiToken) {
      throw new Error('Crime AI API configuration not found');
    }

    // Create API client
    const client = createFetchClient<CrimeApiPaths>({
      baseUrl: crimeAiApiBaseUrl,
      headers: {
        Authorization: `Bearer ${crimeAiApiToken}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Calling Crime AI API PATCH /crimecase/{id}');

    // Call the Crime AI API to update the case
    const { error: apiError } = await client.PATCH('/crimecase/{id}', {
      params: {
        path: { id: caseId }
      },
      body: requestBody
    });

    if (apiError) {
      console.error('Crime AI API error:', apiError);
      throw new Error(`Failed to update crime case: ${apiError}`);
    }

    console.log('Crime case updated successfully');

    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Update crime case error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});