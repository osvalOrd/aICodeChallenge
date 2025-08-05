import styles from './TextInput.module.css';

function TextInput({ value, onChange }) {
  return (
    <textarea
      className={styles['text-input']}
      placeholder="Write your message here"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={6}
    />
  );
}

export default TextInput;
