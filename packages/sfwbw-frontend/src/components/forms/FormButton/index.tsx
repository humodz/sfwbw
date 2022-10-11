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
      className={cls(props.className, 'relative')}
      {...buttonProps}
    >
      <span className={cls({ 'text-transparent': props.loading })}>
        {props.children}
      </span>
      {props.loading && (
        <LoadingIcon className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </button>
  );
}
