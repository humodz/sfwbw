export function repeat<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
}

export function cls(classes: Record<string, any>): string {
  return Object
    .entries(classes)
    .filter(([_name, enabled]) => enabled)
    .map(([name, _enabled]) => name)
    .join(' ');
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

export function isSuccessResponse(response: any): response is { data: any } {
  return 'data' in response;
}

export function isErrorResponse(response: any): response is { error: any } {
  return 'error' in response;
}