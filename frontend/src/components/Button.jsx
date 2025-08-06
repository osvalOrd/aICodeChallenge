import styles from './Button.module.css';

/**
 * Componente Button - Botón para enviar el texto al servidor
 * 
 * @param {function} onClick - Función que se ejecuta cuando se hace clic en el botón
 * @param {boolean} loading - Estado que indica si se está procesando una petición
 * 
 * Este componente muestra un botón que cambia su apariencia y comportamiento
 * según el estado de carga. Cuando está cargando, se deshabilita y muestra
 * "Processing...", cuando no está cargando, está habilitado y muestra "Send".
 */
function Button({ onClick, loading }) {
  return (
    <button
      className={styles['submit-button']} 
      onClick={onClick} // Función que maneja el clic del botón
      disabled={loading} // Deshabilita el botón durante la carga
    >
      {/* Mostrar texto diferente según el estado de carga */}
      {loading ? 'Processing...' : 'Send'}
    </button>
  );
}

export default Button;
