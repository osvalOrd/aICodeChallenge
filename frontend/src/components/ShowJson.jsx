import styles from './ShowJson.module.css';

function ShowJson({ data }) {
  if (!data) return null;

  return (
    <div className={styles['json-display']}>
      <h2>AI Response:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ShowJson;
