import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: import.meta.env.VITE_CLAUDE_API_KEY,
});

export const getChatResponse = async (message: string) => {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1024,
      messages: [{
        role: "user",
        content: message
      }],
      system: "You are a helpful assistant for Jungle Rent, a platform that helps students find accommodation. Be concise and friendly in your responses."
    });

    return response.content[0].text;
  } catch (error) {
    console.error('Error calling Claude API:', error);
    return "I apologize, but I'm having trouble connecting right now. Please try again later.";
  }
};