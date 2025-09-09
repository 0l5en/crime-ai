import { corsHeaders } from '../_shared/cors.ts';
import type { CreateCaseGeneratorFormBasicDto } from '../_shared/crime-api-types.ts';

// Environment variables for the Crime AI API
const CRIME_AI_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Creating new basic crime case');
    
    if (!CRIME_AI_BASE_URL || !CRIME_AI_TOKEN) {
      console.error('Missing required environment variables');
      return new Response(
        JSON.stringify({ error: 'Missing API configuration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse the request body
    const formData: CreateCaseGeneratorFormBasicDto = await req.json();
    console.log('Received form data:', formData);

    // Validate required fields
    if (!formData) {
      return new Response(
        JSON.stringify({ error: 'Request body is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Make request to Crime AI API
    const apiUrl = `${CRIME_AI_BASE_URL}/crimecase-basic`;
    console.log('Making request to:', apiUrl);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    console.log('Crime AI API response status:', response.status);
    
    if (response.status === 202) {
      // Success - extract location header
      const locationHeader = response.headers.get('Location');
      console.log('Location header:', locationHeader);
      
      return new Response(
        JSON.stringify({ locationUrl: locationHeader }),
        { 
          status: 202, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else if (response.status === 400) {
      // Validation error - return the violations response
      const errorData = await response.json();
      console.log('Validation error from API:', errorData);
      
      return new Response(
        JSON.stringify(errorData),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    } else {
      // Other error
      const errorText = await response.text();
      console.error('Crime AI API error:', errorText);
      
      return new Response(
        JSON.stringify({ error: 'Failed to create crime case' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
