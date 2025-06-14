/**
 * Copies specified dependencies from node_modules to a destination directory.
 */

import { existsSync, promises as fs } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputDir = 'dist';

const dependenciesToCopy: string[] = ['react-color', 'lottie-react', 'react-phone-input-2'];

/**
 * Copies dependencies from node_modules to the dist directory.
 */
const copyDependencies = async (): Promise<void> => {
  for (const dependency of dependenciesToCopy) {
    const sourcePath = path.resolve(__dirname, '..', 'node_modules', dependency);
    const destPath = path.resolve(__dirname, '..', outputDir, 'node_modules', dependency);

    // Ensure destination directory exists
    if (!existsSync(destPath)) {
      await fs.mkdir(destPath, { recursive: true });
    }

    try {
      // Copy the directory recursively
      await fs.cp(sourcePath, destPath, { recursive: true });
      console.log(`✅ ${dependency} copied successfully.`);
    } catch (err) {
      console.error(`❌ Error copying ${dependency}:`, err);
    }
  }
};

// Execute and handle errors
copyDependencies().catch(err => {
  console.error('❌ Failed to copy dependencies:', err);
});
