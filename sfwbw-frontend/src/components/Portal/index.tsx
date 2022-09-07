import { useMemo } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  where: string;
  children: JSX.Element
}

export function Portal({ where, children }: Props) {
  const element = useMemo(() => {
    return document.querySelector(where);
  }, [ where ]);

  if (!element) {
    return null;
  }

  return createPortal(children, element);
}