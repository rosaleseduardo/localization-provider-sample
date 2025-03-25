/// <reference types="vitest/config" />

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react-swc';

// ✅ Correct JSON Import (ESM)
import packageJson from './package.json' with { type: 'json' };

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tsconfigPaths(), dts()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    setupFiles: './src/tests/setup.ts',
  },
  define: {
    'process.env': {},
  },
  resolve: {
    alias: {
      '@interfaces': resolve(__dirname, 'src/interfaces'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@providers': resolve(__dirname, 'src/providers'),
      '@locales': resolve(__dirname, 'src/locales'),
      '@helpers': resolve(__dirname, 'src/helpers'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@utils': resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SDKLocalization',
      formats: ['es'],
      fileName: format => `sdk-localization.${format}.js`,
    },
    manifest: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies || {})],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          luxon: 'luxon',
          i18next: 'i18next',
          'react-i18next': 'reactI18next',
        },
      },
    },
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
});
