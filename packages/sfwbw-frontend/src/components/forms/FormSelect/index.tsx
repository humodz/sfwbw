type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

interface FormSelectProps<T extends string>
  extends Omit<SelectProps, 'onChange'> {
  options: { label: string; value: T }[];
  value?: string;
  onChange?: (newValue: T) => void;
}

export function FormSelect<T extends string>(props: FormSelectProps<T>) {
  return (
    <select {...props} onChange={(e) => props.onChange?.(e.target.value as T)}>
      {props.options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
