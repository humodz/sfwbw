import { Expose } from 'class-transformer';

export async function sleep(ms: number) {
  return new Promise((ok) => setTimeout(ok, ms));
}

export class DictItem<K, V> {
  @Expose()
  key!: K;

  @Expose()
  value!: V;
}
