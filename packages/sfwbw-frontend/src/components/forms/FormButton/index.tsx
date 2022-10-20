import { LoadingIcon } from '../../LoadingIcon';
import { cls } from '../../../utils';

interface FormButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export function FormButton(props: FormButtonProps) {
  const { isLoading, className, ...buttonProps } = props;

  return (
    <button
      disabled={props.isLoading}
      className={cls(props.className, 'relative')}
      {...buttonProps}
    >
      <span className={cls({ 'text-transparent': props.isLoading })}>
        {props.children}
      </span>
      {props.isLoading && (
        <LoadingIcon className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </button>
  );
}
