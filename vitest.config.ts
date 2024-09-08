/* eslint-disable unicorn/import-style */
import { resolve } from 'node:path';

import react from '@vitejs/plugin-react';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**/*'],
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(import.meta.dirname, './'),
      },
    ],
  },
});
