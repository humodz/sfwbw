import { useState } from 'react';
import { FormField, FormFieldProps } from '../FormField';
import styles from './styles.module.css';

export type PasswordFieldProps = Omit<FormFieldProps, 'type'>;

export function PasswordField(props: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      id={props.id}
      type={showPassword ? 'text' : 'password'}
      label={<>
        {props.label} {' '}
        <span className={styles.showPasswordButton} onClick={() => setShowPassword(show => !show)}>
          {showPassword ? '[Hide]' : '[Show]'}
        </span>
      </>}
      value={props.value}
      setValue={props.setValue}
      extras={props.extras}
      errorMessage={props.errorMessage}
    />
  );
}