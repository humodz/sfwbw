export async function sleep(ms: number) {
  return new Promise((ok) => setTimeout(ok, ms));
}

export interface DictItem<K, V> {
  key: K;
  value: V;
}
