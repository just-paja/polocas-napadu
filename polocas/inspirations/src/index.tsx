import type { FC } from 'react'

import { App } from './App.js'
import { createRoot } from 'react-dom/client'
import { locales, initLocalization } from '@polocas/ui/i18n'

import './index.scss'

const render = (RootComponent: FC) => {
  const el = document.getElementById('root')
  if (el) {
    const root = createRoot(el)
    root.render(<RootComponent />)
  } else {
    console.error('Missing root element')
  }
}

const startUp = () => {
  initLocalization(locales)
  render(App)
}

startUp()
