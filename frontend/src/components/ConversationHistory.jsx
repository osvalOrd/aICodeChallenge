import styles from './ConversationHistory.module.css';

/**
 * Componente ConversationHistory - Muestra el historial de conversaciones
 * 
 * @param {Array} history - Array de objetos con las conversaciones previas
 * 
 * Este componente renderiza una lista de todas las conversaciones anteriores
 * entre el usuario y la IA. Cada entrada muestra lo que escribió el usuario
 * y la respuesta de la IA. Si no hay historial, no se renderiza nada.
 */
function ConversationHistory({ history }) {
  // Si no hay historial (array vacío), no renderizar nada
  if (history.length === 0) return null;

  return (
    <div className={styles.conversation}>
      {/* Título de la sección de historial */}
      <h3>Conversation History</h3>
      
      {/* Mapear cada entrada del historial a un elemento visual */}
      {history.map((entry, index) => (
        <div key={index} className={styles.message}>
          {/* Mensaje del usuario */}
          <div className={styles.userMessage}>
            <strong>You:</strong> {entry.userInput}
          </div>
          
          {/* Respuesta de la IA */}
          <div className={styles.aiMessage}>
            <strong>AI:</strong> {entry.aiResponse.description}
            
            {/* Mostrar pregunta adicional si existe */}
            {entry.aiResponse.question && (
              <div className={styles.question}>
                <strong>Question:</strong> {entry.aiResponse.question}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConversationHistory; 