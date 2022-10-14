export function repeat<T>(length: number, value: T): T[] {
  return Array(length).fill(value);
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

export async function loadImage(src: string) {
  const img = document.createElement('img');
  img.src = src;

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
  });

  return img;
}
