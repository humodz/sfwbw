import { icons } from '@sfwbw/sfwbw-assets';
import { ReactNode } from 'react';

interface ErrorMessageProps {
  children: ReactNode;
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
        {props.children}
      </div>
    </div>
  );
}
