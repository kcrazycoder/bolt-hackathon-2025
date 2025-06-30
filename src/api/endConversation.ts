import { TAVUS_API_KEY } from '@/config';

export const endConversation = async (conversationId: string) => {
  try {
    const response = await fetch(
      `https://tavusapi.com/v2/conversations/${conversationId}/end`,
      {
        method: 'POST',
        headers: {
          'x-api-key': TAVUS_API_KEY,
        },
      }
    );

    // Handle cases where conversation is already ended or doesn't exist
    if (response.status === 404 || response.status === 409) {
      // Conversation already ended or doesn't exist - treat as success
      return null;
    }

    if (!response.ok) {
      throw new Error('Failed to end conversation');
    }

    return null;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};