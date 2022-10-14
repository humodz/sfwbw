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
