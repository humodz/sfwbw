type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface FormSelectProps extends Omit<SelectProps, 'onChange'> {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (newValue: string) => void;
}

export function FormSelect(props: FormSelectProps) {
  return (
    <select {...props} onChange={(e) => props.onChange?.(e.target.value)}>
      {props.options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
