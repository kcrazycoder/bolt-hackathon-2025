import { TAVUS_API_KEY } from '@/config';

export interface PersonaData {
  persona_name: string;
  system_prompt: string;
  pipeline_mode: 'full' | 'echo';
  context: string;
  default_replica_id?: string;
  layers?: {
    llm?: {
      model?: string;
    };
    tts?: {
      tts_engine?: string;
      voice_settings?: {
        speed?: string;
        emotion?: string[];
      };
    };
    stt?: {
      stt_engine?: string;
      participant_pause_sensitivity?: string;
      participant_interrupt_sensitivity?: string;
      smart_turn_detection?: boolean;
    };
    perception?: {
      perception_model?: string;
      ambient_awareness_queries?: string[];
      perception_analysis_queries?: string[];
      perception_tool_prompt?: string;
      perception_tools?: Array<{
        type: string;
        function: {
          name: string;
          description: string;
          parameters: {
            type: string;
            properties: Record<string, any>;
            required: string[];
          };
        };
      }>;
    };
  };
}

export interface PersonaResponse {
  persona_id: string;
  persona_name: string;
  created_at: string;
}

export const createPersona = async (personaData: PersonaData): Promise<PersonaResponse> => {
  try {
    const response = await fetch('https://tavusapi.com/v2/personas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify(personaData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating persona:', error);
    throw error;
  }
};

export const deletePersona = async (personaId: string): Promise<void> => {
  try {
    const response = await fetch(`https://tavusapi.com/v2/personas/${personaId}`, {
      method: 'DELETE',
      headers: {
        'x-api-key': TAVUS_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error deleting persona:', error);
    throw error;
  }
};

export const getPersona = async (personaId: string): Promise<any> => {
  try {
    const response = await fetch(`https://tavusapi.com/v2/personas/${personaId}`, {
      method: 'GET',
      headers: {
        'x-api-key': TAVUS_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching persona:', error);
    throw error;
  }
};