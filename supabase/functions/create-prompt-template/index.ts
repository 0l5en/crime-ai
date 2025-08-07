import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { corsHeaders } from '../_shared/cors.ts';

console.log('create-prompt-template function started');

const CRIME_AI_API_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_API_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  console.log('create-prompt-template function invoked');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!CRIME_AI_API_TOKEN) {
      console.error('CRIME_AI_API_TOKEN environment variable is not set');
      return new Response(
        JSON.stringify({ error: 'Missing API token configuration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (!CRIME_AI_API_BASE_URL) {
      console.error('CRIME_AI_API_BASE_URL environment variable is not set');
      return new Response(
        JSON.stringify({ error: 'Missing API base URL configuration' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const { name, template } = await req.json();
    console.log('Request data:', { name: name, templateLength: template?.length });

    if (!name || !template) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name and template' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Call the Crime AI API
    const response = await fetch(`${CRIME_AI_API_BASE_URL}/prompt-template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CRIME_AI_API_TOKEN}`,
      },
      body: JSON.stringify({
        name,
        template
      }),
    });

    console.log('Crime AI API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Crime AI API error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to create prompt template', details: errorText }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Prompt template created successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Unexpected error in create-prompt-template function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});