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
    forms: resolve(baseDir, 'forms.ts'),
    index: resolve(baseDir, 'index.tsx'),
    inputs: resolve(baseDir, 'inputs.tsx'),
    icons: resolve(baseDir, 'icons.tsx'),
    i18n: resolve(baseDir, 'i18n.tsx'),
    links: resolve(baseDir, 'links.tsx'),
    prices: resolve(baseDir, 'prices.tsx'),
    shows: resolve(baseDir, 'shows.tsx'),
    text: resolve(baseDir, 'text.tsx'),
  },
  externals: {
    '@apollo/client': '@apollo/client',
    '@apollo/client/link/context': '@apollo/client/link/context/index.js',
    bootstrap: 'bootstrap',
    classnames: 'classnames',
    express: 'express',
    moment: 'moment',
    'moment-timezone': 'moment-timezone',
    '@polocas-napadu/core': '@polocas-napadu/core',
    'query-string': 'query-string',
    'react-bootstrap': 'react-bootstrap',
    'react-hook-form': 'react-hook-form',
    'react-icons': 'react-icons',
    'react-i18next': 'react-i18next',
    'react-markdown': 'react-markdown',
    'react-overlays': 'react-overlays',
    'react-router': 'react-router',
  },
  outputModules: true,
  externalsPresets: { node: true },
  outputFileName: '[name].js',
  target: 'node',
})
