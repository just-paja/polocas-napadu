/* istanbul ignore file */

import { setupReactWebpack } from '@polocas/webpack'
import { resolve } from 'path'
import { URL } from 'url'

const baseDir = new URL('.', import.meta.url).pathname

export const { build, runDevServer } = setupReactWebpack({
  defaultPort: 3002,
  distDir: resolve(baseDir, 'dist'),
  entryPath: resolve(baseDir, 'src', 'index.tsx'),
  template: resolve(baseDir, 'public', 'index.html'),
})
