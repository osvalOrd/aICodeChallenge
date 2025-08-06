const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { getStructuredResponse } = require('./aiService');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/parse', async (req, res) => {
  const { text, conversationHistory = [] } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }

  try {
    const jsonResponse = await getStructuredResponse(text, conversationHistory);
    res.json(jsonResponse);
  } catch (error) {
    console.error('Error al obtener respuesta de la IA:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
