import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    skipDependencies([
      'cache-manager',
      'class-validator',
      'class-transformer',
      '@nestjs/websockets/socket-module',
      '@nestjs/microservices/microservices-module',
      '@nestjs/microservices',
    ]),
    nodeResolve({
      preferBuiltins: true,
    }),
    typescript({
      tsconfig: 'tsconfig.build.json',
      declaration: false,
    }),
    commonjs({
      strictRequires: true,
    }),
    json(),
  ],
  onwarn(warning, warn) {
    if (warning.code === 'CIRCULAR_DEPENDENCY') {
      return;
    }
    warn(warning);
  },
};

function skipDependencies(packages) {
  const entries = packages.map((name) => ({
    find: name,
    replacement: './skipped-dependency.js',
  }));

  return alias({ entries });
}
