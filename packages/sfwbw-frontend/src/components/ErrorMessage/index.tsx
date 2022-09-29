import { icons } from '@sfwbw/sfwbw-assets';
import { ReactNode } from 'react';
import { getErrorMessage, RtkQueryError } from '../../utils/errors';
import { If } from '../../utils/jsxConditionals';

interface ErrorMessageProps {
  error?: RtkQueryError;
  children?: ReactNode;
}

export function ErrorMessage(props: ErrorMessageProps) {
  return (
    <div
      style={{
        display: 'flex',
        borderLeft: '5px solid var(--code)',
        borderRadius: '2px',
        padding: '0.5rem',
        backgroundColor: 'var(--accent-bg)',
      }}
    >
      <img
        src={icons.error}
        alt="Error"
        style={{
          imageRendering: 'pixelated',
          height: '64px',
          width: '64px',
          borderRadius: 0,
          flexBasis: 0,
          flexGrow: 0,
        }}
      />
      <div
        style={{
          marginLeft: '1rem',
          flexGrow: 1,
        }}
      >
        {If(props.error) ? getErrorMessage(props.error) : props.children}
      </div>
    </div>
  );
}
