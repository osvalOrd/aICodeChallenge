import { useState } from 'react';
import './App.css';
import TextInput from './components/TextInput';
import Button from './components/Button';
import ErrorMessage from './components/ErrorMessage';
import ShowJson from './components/ShowJson';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [jsonResult, setJsonResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('editing'); 

  const sendText = async () => {
    setLoading(true);
    setError('');
    setJsonResult(null);

    try {
      const response = await axios.post('', {
        text: inputText,
      });

      setJsonResult(response.data);
      setMode('result');
    } catch (err) {
      setError('Error al conectar con el servidor o procesar la respuesta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container ${mode}`}>
      {mode === 'editing' && (
        <>
          <h1>Situation Analyzer</h1>
          <TextInput value={inputText} onChange={setInputText} />
          <Button onClick={sendText} loading={loading} />
          <ErrorMessage message={error} />
        </>
      )}

      {mode === 'result' && (
        <>
          <div className="result-content">
            <ShowJson data={jsonResult} />
          </div>
          <div className="editor-footer">
            <TextInput value={inputText} onChange={setInputText} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
