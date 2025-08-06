import { useState } from 'react';
import './App.css';
import TextInput from './components/TextInput';
import Button from './components/Button';
import ErrorMessage from './components/ErrorMessage';
import ShowJson from './components/ShowJson';
import ConversationHistory from './components/ConversationHistory';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [jsonResult, setJsonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationHistory, setConversationHistory] = useState([]); 

  const sendText = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://aicodechallenge.onrender.com/api/parse', {
        text: inputText,
        conversationHistory: conversationHistory,
      });

      const newResult = response.data;
      setJsonResult(newResult);
      
      // Add to conversation history
      setConversationHistory(prev => [...prev, {
        userInput: inputText,
        aiResponse: newResult
      }]);
      
      // Clear input for next message
      setInputText('');
    } catch (err) {
      setError('Error trying to parse the text or connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Situation Analyzer</h1>
      
      {/* Show conversation history */}
      <ConversationHistory history={conversationHistory} />

      {/* Always show the input and button */}
      <div className="input-section">
        <TextInput value={inputText} onChange={setInputText} />
        <Button onClick={sendText} loading={loading} />
        <ErrorMessage message={error} />
      </div>

      {/* Show current result if available */}
      {jsonResult && (
        <div className="result-section">
          <h2>Latest Analysis</h2>
          <ShowJson data={jsonResult} />
          <button 
            className="clear-button"
            onClick={() => {
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
