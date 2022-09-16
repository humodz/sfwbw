import { OnModuleInit } from '@nestjs/common';

type Resolved<T> = {
  [key in keyof T]: Awaited<T[key]>;
};

const ResolvedConfig = Symbol.for('ResolvedConfig');

export class AsyncConfig implements OnModuleInit {
  [ResolvedConfig]: any = {};

  async onModuleInit() {
    await Promise.all(
      Object.entries(this).map(async ([key, value]) => {
        this[ResolvedConfig][key as keyof this] = await value;
      }),
    );
  }

  get resolved(): Resolved<this> {
    return this[ResolvedConfig];
  }
}
