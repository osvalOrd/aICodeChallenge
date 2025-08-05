import styles from './Button.module.css';

function Button({ onClick, loading }) {
  return (
    <button
      className={styles['submit-button']}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? 'Processing...' : 'Send'}
    </button>
  );
}

export default Button;
