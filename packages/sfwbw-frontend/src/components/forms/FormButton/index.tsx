import { Else, If } from '../../../utils/jsx-conditionals';
import { LoadingIcon } from '../../LoadingIcon';

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export function FormButton(props: FormButtonProps) {
  const buttonProps = { ...props, loading: undefined };

  return (
    <button disabled={props.loading} {...buttonProps}>
      {
        If(!props.loading) && (
          props.children
        ) || Else && (
          <LoadingIcon />
        )
      }
    </button>
  );
}

