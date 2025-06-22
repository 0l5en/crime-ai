
import { corsHeaders } from '../_shared/cors.ts';
import type { CreateCrimeCaseDto } from '../_shared/crime-api-types.ts';

const CRIME_AI_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting create-crime-case function...');
    
    if (!CRIME_AI_BASE_URL || !CRIME_AI_TOKEN) {
      throw new Error('Missing required environment variables');
    }

    const caseData: CreateCrimeCaseDto = await req.json();
    console.log('Creating crime case with data:', caseData);

    const url = `${CRIME_AI_BASE_URL}/crimecase`;
    console.log('Making request to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(caseData),
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    // For 201 created responses, there might not be response body
    let responseData = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    }

    console.log('Successfully created crime case');

    return new Response(JSON.stringify(responseData), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in create-crime-case function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });
  }
});
