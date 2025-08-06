import { useState } from 'react';
import './App.css';
import TextInput from './components/TextInput';
import Button from './components/Button';
import ErrorMessage from './components/ErrorMessage';
import ShowJson from './components/ShowJson';
import ConversationHistory from './components/ConversationHistory';
import axios from 'axios';

/**
 * Componente principal de la aplicación
 * Maneja el estado global y la lógica de comunicación con el servidor
 */
function App() {
  // Estados para manejar la información de la aplicación
  const [inputText, setInputText] = useState(''); // Texto ingresado por el usuario
  const [jsonResult, setJsonResult] = useState(null); // Resultado del análisis de ia
  const [loading, setLoading] = useState(false); // Estado de carga durante la petición
  const [error, setError] = useState(''); // Mensaje de error si algo falla
  const [conversationHistory, setConversationHistory] = useState([]); // Historial de conversaciones

  /**
   * Función para enviar el texto al servidor y obtener el análisis
   * Esta función se ejecuta cuando el usuario hace clic en el botón "Send"
   */
  const sendText = async () => {
    // Activar estado de carga y limpiar errores previos
    setLoading(true);
    setError('');

    try {
      // Realiza la petición POST al servidor con el texto y el historial
      const response = await axios.post('https://aicodechallenge.onrender.com/api/parse', {
        text: inputText,
        conversationHistory: conversationHistory, // Envia el historial para contexto
      });

      // Obtiene el resultado del análisis
      const newResult = response.data;
      setJsonResult(newResult);
      
      // Agrega la nueva conversación al historial
      // Usamos el patron de funcion para acceder al estado anterior
      setConversationHistory(prev => [...prev, {
        userInput: inputText, // Lo que escribió el usuario
        aiResponse: newResult // Respuesta de la IA
      }]);
      
      // Limpia el campo de entrada para la siguiente interacción
      setInputText('');
    } catch (err) {
      // Maneja errores de red o del servidor
      setError('Error trying to parse the text or connecting to the server.');
    } finally {
      // Siempre desactiva el estado de carga, sin importar el resultado
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* Titulo principal de la aplicación */}
      <h1>Situation Analyzer</h1>
      
      {/* Componente que muestra el historial de conversaciones previas */}
      <ConversationHistory history={conversationHistory} />

      <div className="input-section">
        {/* Campo de texto para que el usuario escriba su situacion */}
        <TextInput value={inputText} onChange={setInputText} />
        {/* Boton para enviar el texto al servidor */}
        <Button onClick={sendText} loading={loading} />
        {/* Componente para mostrar errores */}
        <ErrorMessage message={error} />
      </div>

      {/* Seccion de resultados: solo se muestra si hay un análisis disponible */}
      {jsonResult && (
        <div className="result-section">
          <h2>Latest Analysis</h2>
          {/* Componente que muestra el JSON del análisis */}
          <ShowJson data={jsonResult} />
          {/* Boton para reiniciar la aplicacion y comenzar un nuevo análisis */}
          <button 
            className="clear-button"
            onClick={() => {
              // Limpia todos los estados para comenzar de nuevo
              setJsonResult(null);
              setInputText('');
              setError('');
              setConversationHistory([]);
            }}
          >
            Start New Analysis
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
