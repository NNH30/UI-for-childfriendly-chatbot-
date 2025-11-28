export interface ChatbotInput {
  text: string;
  imageFile?: File | null;
}

export interface ChatbotResponse {
  text: string;
}

export async function callChatbotModel(input: ChatbotInput): Promise<ChatbotResponse> {
  // TODO: integrate with Gemma 3n E4B backend API here.
  // This placeholder simulates a small delay and returns a friendly canned response.
  await new Promise((resolve) => setTimeout(resolve, 900));

  const friendlyResponses = [
    "Thanks for sharing! What would you like to explore next?",
    "That sounds exciting! Do you want a fun fact or a mini challenge?",
    "I love your curiosity. Tell me more!",
  ];

  const fallbackText = friendlyResponses[Math.floor(Math.random() * friendlyResponses.length)];

  return {
    text: `${fallbackText} (You said: "${input.text}")`,
  };
}
