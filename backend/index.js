const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getStructuredResponse } = require('./aiService');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear instancia de la aplicación Express
const app = express();

// Configurar CORS para permitir peticiones desde el frontend 
app.use(cors());

// Configuracion para parsear JSON en las peticiones
app.use(express.json());

/**
 * Endpoint POST /api/parse
 * 
 * Este endpoint recibe texto del usuario y lo envía a la IA para análisis.
 * También recibe el historial de conversaciones para mantener contexto.
 * 
 * @param {Object} req.body.text - El texto a analizar
 * @param {Array} req.body.conversationHistory - Historial de conversaciones previas
 */
app.post('/api/parse', async (req, res) => {
  // Extraer datos del cuerpo de la petición con valor por defecto para conversationHistory
  const { text, conversationHistory = [] } = req.body;

  // Validar que se agrego texto, de lo contrario se envia un error 400
  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    // Llamar al servicio de IA para obtener el análisis estructurado
    const jsonResponse = await getStructuredResponse(text, conversationHistory);
    
    // Enviar respuesta exitosa con el análisis
    res.json(jsonResponse);
  } catch (error) {
    // Manejar errores de la IA o del servidor
    console.error('Error trying to parse the text or connecting to the server:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Configurar puerto del servidor 
const PORT = process.env.PORT || 3000;

// Iniciar el servidor y mostrar mensaje de confirmación
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
