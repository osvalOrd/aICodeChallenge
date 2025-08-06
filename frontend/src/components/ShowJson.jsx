import styles from './ShowJson.module.css';

/**
 * Componente ShowJson - Muestra datos JSON de forma legible
 * 
 * @param {object} data - Los datos JSON que se van a mostrar
 * 
 * Este componente toma un objeto JavaScript y lo muestra como JSON formateado
 * si no hay datos no se renderiza nada.
 */
function ShowJson({ data }) {
  // Si no hay datos, no renderiza nada 
  if (!data) return null;

  return (
    <div className={styles['json-display']}>
      {/* Título de la sección */}
      <h2>AI Response:</h2>
      {/* Mostrar el JSON formateado con indentación de 2 espacios */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ShowJson;
