
import { corsHeaders } from '../_shared/cors.ts';
import type { TaskInfoDto } from '../_shared/crime-api-types.ts';

const CRIME_AI_BASE_URL = Deno.env.get('CRIME_AI_API_BASE_URL');
const CRIME_AI_TOKEN = Deno.env.get('CRIME_AI_API_TOKEN');

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting get-task-info function...');
    
    if (!CRIME_AI_BASE_URL || !CRIME_AI_TOKEN) {
      throw new Error('Missing required environment variables');
    }

    const { taskId } = await req.json();
    console.log('Getting task info for ID:', taskId);

    if (!taskId) {
      throw new Error('Missing taskId parameter');
    }

    const url = `${CRIME_AI_BASE_URL}/task/${taskId}`;
    console.log('Making request to:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${CRIME_AI_TOKEN}`,
        'Accept': 'application/json',
      },
    });

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`API request failed: ${response.status} ${errorText}`);
    }

    const taskInfo: TaskInfoDto = await response.json();
    console.log('Task info received:', taskInfo);

    return new Response(JSON.stringify(taskInfo), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json' 
      },
    });

  } catch (error) {
    console.error('Error in get-task-info function:', error);
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
