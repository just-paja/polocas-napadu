/* istanbul ignore file */
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'
import { readManifest, transpileScript } from '@polocas-napadu/webpack'

const baseDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const getWebpackEnvironment = () => {
  return {
    distDir: join(baseDir, 'dist'),
    entryPath: join(baseDir, 'index.ts'),
    manifest: readManifest(baseDir),
    target: 'node',
    env: {
      NODE_DEBUG: Boolean(process.env.NODE_DEBUG),
      ...process.env,
    },
  }
}

export const build = () => transpileScript(getWebpackEnvironment())
