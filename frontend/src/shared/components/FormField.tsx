import styles from "./FormField.module.css";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (name: string, value: string) => void;
  required?: boolean;
  min?: string | number;
  step?: string;
}

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  min,
  step,
}: FormFieldProps) {
  return (
    <label className={styles.wrapper}>
      <span>{label}</span>
      <input
        className={styles.input}
        name={name}
        type={type}
        value={value}
        required={required}
        min={min}
        step={step}
        onChange={(event) => onChange(name, event.target.value)}
      />
    </label>
  );
}
