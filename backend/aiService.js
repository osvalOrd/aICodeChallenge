const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_API_KEY = "AIzaSyDdqcJGdmj5rYRNWGYT-J3P81LS8ZXLttI";

async function getStructuredResponse(userText, conversationHistory = []) {
  let contextPrompt = '';
  if (conversationHistory.length > 0) {
    contextPrompt = 'Previous conversation:\n';
    conversationHistory.forEach((entry, index) => {
      contextPrompt += `${index + 1}. User: ${entry.userInput}\n`;
      contextPrompt += `   AI: ${JSON.stringify(entry.aiResponse)}\n\n`;
    });
    contextPrompt += 'Current user input: ';
  }

  const prompt = `${contextPrompt}From the following text, respond with a JSON with the following fields: date (yyyy-mm-dd), location, description (brief), injuries (true/false), owner (true/false), complete (true/false), question (if missing info). If complete is true, question must be empty. Consider the conversation history when analyzing the current input.
  
Text: "${userText}"
JSON:`;

  try {
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    const jsonString = text.substring(start, end + 1);

    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error calling Gemini API:', error.message);
    console.error('Error details:', error);
    return {
      date: "2024-01-15",
      location: "Error Location",
      description: `Error processing request: ${error.message}`,
      injuries: false,
      owner: false,
      complete: false,
      question: "API Error occurred"
    };
  }
}

module.exports = { getStructuredResponse };
