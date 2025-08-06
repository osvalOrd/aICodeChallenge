import styles from './ConversationHistory.module.css';

function ConversationHistory({ history }) {
  if (history.length === 0) return null;

  return (
    <div className={styles.conversation}>
      <h3>Conversation History</h3>
      {history.map((entry, index) => (
        <div key={index} className={styles.message}>
          <div className={styles.userMessage}>
            <strong>You:</strong> {entry.userInput}
          </div>
          <div className={styles.aiMessage}>
            <strong>AI:</strong> {entry.aiResponse.description}
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