import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import chalk from 'chalk';

export default {
  input: 'src/main.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    optionalDependencies([
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

function optionalDependencies(packages) {
  const regExpSpecialChars = /[.+*?|\\^$()[\]{}]/g;

  const notInstalled = packages.filter((name) => {
    try {
      require.resolve(name);
      console.warn(
        `${chalk.yellow.bold('WARNING')}`,
        `Not skipping ${chalk.green.bold(name)} because it is installed`,
      );
      return false;
    } catch {
      return true;
    }
  });

  const entries = notInstalled.map((name) => ({
    // Using regexp instead of string to avoid the following error:
    // Error: Could not load ./skipped-dependency.js/microservices-module
    find: new RegExp(`^${name.replace(regExpSpecialChars, '\\$1')}$`),
    replacement: './skipped-dependency.js',
  }));

  return alias({ entries });
}
