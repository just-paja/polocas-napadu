/* istanbul ignore file */

import { setupReactWebpack } from '@polocas/webpack'
import { resolve } from 'path'
import { URL } from 'url'

const baseDir = new URL('.', import.meta.url).pathname

export const { build, runDevServer } = setupReactWebpack({
  defaultPort: 3003,
  distDir: resolve(baseDir, 'dist'),
  entryPath: {
    apollo: resolve(baseDir, 'apollo.tsx'),
    buttons: resolve(baseDir, 'buttons.tsx'),
    content: resolve(baseDir, 'content.tsx'),
    datetime: resolve(baseDir, 'datetime.tsx'),
    decorators: resolve(baseDir, 'decorators.tsx'),
    dialogs: resolve(baseDir, 'dialogs.tsx'),
    dials: resolve(baseDir, 'dials.tsx'),
    errors: resolve(baseDir, 'errors.tsx'),
    events: resolve(baseDir, 'events.tsx'),
    forms: resolve(baseDir, 'forms.tsx'),
    index: resolve(baseDir, 'index.tsx'),
    inputs: resolve(baseDir, 'inputs.tsx'),
    icons: resolve(baseDir, 'icons.tsx'),
    links: resolve(baseDir, 'links.tsx'),
    prices: resolve(baseDir, 'prices.tsx'),
    shows: resolve(baseDir, 'shows.tsx'),
    text: resolve(baseDir, 'text.tsx'),
  },
  outputFileName: '[name].js',
  target: 'node',
})
