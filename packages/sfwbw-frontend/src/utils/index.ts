import React from 'react';

export function repeat<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

export function cls(
  ...classes: Array<undefined | string | Record<string, any>>
): string {
  return classes
    .map((item) => {
      if (!item) {
        return '';
      } else if (typeof item === 'string') {
        return item;
      } else {
        const result: string[] = [];

        for (const [name, enabled] of Object.entries(item)) {
          if (enabled) {
            result.push(name);
          }
        }

        return result.join(' ');
      }
    })
    .join(' ');
}

interface CSSPropertiesWithVars extends React.CSSProperties {
  [key: `--${string}`]: string | number;
}

export function cssVars(vars: CSSPropertiesWithVars): React.CSSProperties {
  return vars as any;
}

export function saveFile(filename: string, content: string, type = 'text') {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');
  anchor.download = filename;
  anchor.href = url;

  document.body.append(anchor);
  anchor.click();

  setTimeout(() => {
    anchor.remove();
    URL.revokeObjectURL(url);
  }, 0);
}

export function isSuccessResponse<T>(response: any): response is { data: T } {
  return 'data' in response;
}

export function isErrorResponse(response: any): response is { error: any } {
  return 'error' in response;
}

export function navActiveClass(otherClasses = '') {
  return (props: { isActive: boolean }) => {
    if (props.isActive) {
      return `active ${otherClasses}`;
    } else {
      return otherClasses;
    }
  };
}
