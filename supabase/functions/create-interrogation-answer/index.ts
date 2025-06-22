
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import type { CreateInterrogationAnswerDto } from "../_shared/crime-api-types.ts";

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

console.log('Starting create-interrogation-answer function...');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Creating interrogation answer via external API...');
    
    const requestBody: CreateInterrogationAnswerDto = await req.json();
    console.log('Request body:', requestBody);
    
    const { question, userId, personId } = requestBody;
    
    if (!question || !userId || !personId) {
      throw new Error('question, userId and personId are required');
    }

    const url = `${CRIME_AI_API_BASE_URL}/interrogation`;
    console.log(`Making request to: ${url}`);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        userId,
        personId: parseInt(personId.toString()),
      }),
    });

    console.log(`API response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error: ${response.status} - ${errorText}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.text(); // API returns plain text with the ID
    console.log('Successfully created interrogation answer with ID:', data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in create-interrogation-answer function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
