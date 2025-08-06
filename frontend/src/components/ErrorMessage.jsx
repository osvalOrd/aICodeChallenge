import styles from './ErrorMessage.module.css';

/**
 * Componente ErrorMessage - Muestra mensajes de error al usuario
 * 
 * @param {string} message - El mensaje de error a mostrar
 * 
 * Este componente es condicional: solo se renderiza si hay un mensaje de error.
 * Si no hay mensaje no muestra nada.
 */
function ErrorMessage({ message }) {
  // Si no hay mensaje, no renderiza nada 
  if (!message) return null;
  
  // Renderiza el mensaje 
  return <p className={styles['error-message']}>{message}</p>;
}

export default ErrorMessage;
