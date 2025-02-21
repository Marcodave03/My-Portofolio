import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Load from environment variable
const API_URL = "https://api.openai.com/v1/chat/completions";

export const fetchOpenAIResponse = async (userMessage: string) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo", // Change to "gpt-4" if you have access
        messages: [{ role: "user", content: userMessage }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    return "Error fetching response. Please try again.";
  }
};
