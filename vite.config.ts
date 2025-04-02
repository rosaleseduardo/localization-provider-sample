/// <reference types="vitest/config" />

import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

import react from '@vitejs/plugin-react-swc';

import packageJson from './package.json' with { type: 'json' };

// Get the current directory name
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Vite configuration for the localization provider package.
 * Defines build settings, plugins, testing environment, and module resolution paths.
 */
export default defineConfig({
  plugins: [
    // Enables SWC-based React support for Vite
    react(),
    // Supports TypeScript path aliases
    tsconfigPaths(),
    // Generates TypeScript declaration files
    dts(),
  ],
  test: {
    // Enables global variables for tests
    globals: true,
    // Sets up a DOM-like test environment
    environment: 'jsdom',
    // Runs setup script before tests
    setupFiles: './src/tests/setup.ts',
  },
  define: {
    // Defines an empty process.env object
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
      // Entry point for the library
      entry: resolve(__dirname, 'src/index.ts'),
      // Global variable name for UMD builds
      name: 'SDKLocalization',
      // Output format: ES module
      formats: ['es'],
      // Output file naming pattern
      fileName: format => `sdk-localization.${format}.js`,
    },
    // Generates a manifest file for the build
    manifest: true,
    rollupOptions: {
      // Exclude dependencies from the bundle
      external: [...Object.keys(packageJson.dependencies || {})],
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
    // Sets the target JavaScript version for transpilation
    target: 'esnext',
    // Output directory for the build
    outDir: 'dist',
    // Clears the output directory before building
    emptyOutDir: false,
  },
  esbuild: {
    supported: {
      'top-level-await': true,
    },
  },
});
