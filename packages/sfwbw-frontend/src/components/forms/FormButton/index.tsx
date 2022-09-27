import styles from './styles.module.css';

import { LoadingIcon } from '../../LoadingIcon';
import { cls } from '../../../utils';

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function FormButton(props: FormButtonProps) {
  const buttonProps = { ...props, loading: undefined };

  return (
    <button
      disabled={props.loading}
      className={cls({
        [styles.formButton]: true,
        [styles.loading]: props.loading,
      })}
      {...buttonProps}
    >
      <span>{props.children}</span>
      <LoadingIcon />
    </button>
  );
}
