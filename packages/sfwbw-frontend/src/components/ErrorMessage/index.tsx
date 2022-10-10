import { icons } from '@sfwbw/sfwbw-assets';
import { ReactNode } from 'react';
import { getErrorMessage, RtkQueryError } from '../../utils/errors';
import { If } from '../../utils/jsxConditionals';

interface ErrorMessageProps {
  error?: RtkQueryError;
  children?: ReactNode;
}

const classes = {
  container:
    'flex bg-accent-bg p-2 rounded border-solid border-0 border-l-4 border-code',
  image: 'grow-0 basis-0 h-16 w-16',
  text: 'grow-1 ml-4',
};

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className={classes.container}>
      <img className={classes.image} src={icons.error} alt="Error" />
      <div className={classes.text}>
        {If(props.error) ? getErrorMessage(props.error) : props.children}
      </div>
    </div>
  );
}
