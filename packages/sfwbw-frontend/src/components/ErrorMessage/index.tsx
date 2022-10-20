import { icons } from '@sfwbw/sfwbw-assets';
import { ReactNode } from 'react';
import { getErrorMessage, RtkQueryError } from '../../utils';

interface ErrorMessageProps {
  error?: RtkQueryError;
  children?: ReactNode;
}

const classes = {
  container:
    'flex bg-accent-bg p-2 mt-4 rounded border-solid border-0 border-l-4 border-code',
  image: 'grow-0 basis-0 pixelated w-[64px] h-[64px]',
  text: 'grow-1 ml-4',
};

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div className={classes.container}>
      <img className={classes.image} src={icons.error} alt="Error" />
      <div className={classes.text}>
        {props.error ? getErrorMessage(props.error) : props.children}
      </div>
    </div>
  );
}
