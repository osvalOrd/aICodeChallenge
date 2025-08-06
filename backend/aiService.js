const { GoogleGenerativeAI } = require('@google/generative-ai');

// Obtener la clave de API desde las variables de entorno
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

/**
 * Función para obtener una respuesta estructurada de la IA
 * 
 * @param {string} userText - El texto del usuario a analizar
 * @param {Array} conversationHistory - Historial de conversaciones previas para contexto
 * @returns {Object} Objeto JSON con el análisis estructurado de la situación
 * 
 * Esta función toma el texto del usuario y lo envía a la IA de Google (Gemini)
 * para obtener un análisis estructurado en formato JSON. También incluye
 * el historial de conversaciones para mantener el contexto de la conversación.
 */
async function getStructuredResponse(userText, conversationHistory = []) {
  // Variable para construir el contexto de conversaciones previas
  let contextPrompt = '';
  
  // Si hay historial de conversaciones, construir el contexto
  if (conversationHistory.length > 0) {
    contextPrompt = 'Previous conversation:\n';
    
    // Iterar sobre cada entrada del historial
    conversationHistory.forEach((entry, index) => {
      contextPrompt += `${index + 1}. User: ${entry.userInput}\n`;
      contextPrompt += `   AI: ${JSON.stringify(entry.aiResponse)}\n\n`;
    });
    
    contextPrompt += 'Current user input: ';
  }

  // Construir el prompt completo para la IA
  const prompt = `${contextPrompt}From the following text, respond with a JSON with the following fields: date (yyyy-mm-dd), location, description (brief), injuries (true/false), owner (true/false), complete (true/false), question (if missing info). If complete is true, question must be empty. Consider the conversation history when analyzing the current input.
  
Text: "${userText}"
JSON:`;

  try {
    // Inicializar la API de Google Generative AI
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    
    // Obtener el modelo Gemini 1.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generar contenido usando la IA
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extraer solo la parte JSON de la respuesta
    // Buscar el primer '{' y el último '}' para obtener el JSON completo
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    const jsonString = text.substring(start, end + 1);

    // Parsear y retornar el JSON
    return JSON.parse(jsonString);
  } catch (error) {
    // Manejar errores de la API de Gemini
    console.error('Error calling Gemini API:', error.message);
    console.error('Error details:', error);
    
    // Retornar un objeto de error predeterminado
    return {
      date: "unknown",
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
