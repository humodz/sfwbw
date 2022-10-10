import { LoadingIcon } from '../../LoadingIcon';
import { cls } from '../../../utils';
import { If } from '../../../utils/jsxConditionals';

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
      {If(props.loading) && (
        <LoadingIcon className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </button>
  );
}
