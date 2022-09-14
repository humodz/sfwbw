import { useEffect, useRef } from 'react';

export interface FormFieldProps {
  id: string;
  label: any;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  setValue?: (newValue: string) => void;
  errorMessage?: string;
  extras?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function FormField(props: FormFieldProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.setCustomValidity(props.errorMessage || '');
      ref.current.reportValidity();
    }
  }, [props.errorMessage]);

  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        style={{ width: '100%' }}
        ref={ref}
        type={props.type || 'text'}
        id={props.id}
        name={props.id}
        value={props.value || ''}
        onChange={e => props.setValue?.(e.target.value)}
        {...(props.extras || {})}
      />
    </div>
  );
}