import styles from './styles.module.css';

import { ReactNode, useState } from 'react';
import { usePopper } from 'react-popper';
import { cls } from '../../utils/css';

interface TooltipProps {
  hide?: boolean;
  anchor: Element | null;
  children: ReactNode;
}

export function useTooltipAnchor() {
  return useState<Element | null>(null);
}

export function Tooltip(props: TooltipProps) {
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLElement | null>(null);

  const { styles: popperStyles, attributes } = usePopper(
    props.anchor,
    popperElement,
    {
      modifiers: [
        { name: 'arrow', options: { element: arrowElement } },
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    },
  );

  return (
    <>
      <div
        className={cls({ [styles.tooltip]: true, [styles.hide]: props.hide })}
        ref={setPopperElement}
        style={popperStyles.popper}
        {...attributes.popper}
      >
        {props.children}
        <div
          className={styles.arrow}
          ref={setArrowElement}
          style={popperStyles.arrow}
        />
      </div>
    </>
  );
}
