import styles from './TextInput.module.css';

/**
 * Componente TextInput - Campo de texto para entrada del usuario
 * 
 * @param {string} value - El valor actual del campo de texto
 * @param {function} onChange - Función que se ejecuta cuando el usuario escribe
 * 
 * Este componente es un textarea que permite al usuario escribir su situación
 * para que sea analizada
 */
function TextInput({ value, onChange }) {
  return (
    <textarea
      className={styles['text-input']} 
      placeholder="Write your message here" // Texto de ayuda para el usuario
      value={value} // Valor controlado desde el componente padre
      onChange={(e) => onChange(e.target.value)} // Manejar cambios en el texto
      rows={6} // Número de filas visibles
    />
  );
}

export default TextInput;
