
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import type { CreateSolutionAttemptDto } from "../_shared/crime-api-types.ts";

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

console.log('Starting create-solution-attempt function...');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Creating solution attempt via external API...');
    
    const { caseId, solution, userId } = await req.json();
    console.log(`Case ID: ${caseId}, User ID: ${userId}, Solution:`, solution);
    
    if (!caseId || !solution || !userId) {
      throw new Error('caseId, solution, and userId are required');
    }

    const apiUrl = `${CRIME_AI_API_BASE_URL}/crimecase/${caseId}/solution-attempt`;
    console.log(`Making request to: ${apiUrl}`);

    const requestBody: CreateSolutionAttemptDto = {
      solution,
      userId
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.text(); // API returns the ID as text
    console.log('Successfully created solution attempt with ID:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-solution-attempt function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
