
import { corsHeaders } from '../_shared/cors.ts';
import type { CreateEvidenceReportDto } from '../_shared/crime-api-types.ts';

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL') || 'https://crime-ai.0l5en.de';

Deno.serve(async (req) => {
  console.log('Starting create-evidence-report function...');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    const createEvidenceReportDto: CreateEvidenceReportDto = await req.json();
    
    console.log('Creating evidence report:', createEvidenceReportDto);

    const crimeApiToken = Deno.env.get('CRIME_AI_API_TOKEN');
    
    if (!crimeApiToken) {
      console.error('CRIME_AI_API_TOKEN not found');
      return new Response(
        JSON.stringify({ error: 'API token not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const apiUrl = `${CRIME_AI_API_BASE_URL}/evidence-report`;
    console.log(`Making request to: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${crimeApiToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createEvidenceReportDto),
    });

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      if (response.status === 400) {
        console.log('Invalid request body');
        return new Response(
          JSON.stringify({ error: 'Invalid request body' }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
      
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    console.log('Evidence report created successfully');

    return new Response(null, {
      status: 201,
      headers: corsHeaders
    });

  } catch (error) {
    console.error('Error in create-evidence-report function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
