import type { FC } from 'react'

import { App } from './App.js'
import { createRoot } from 'react-dom/client'
import { initLocalization } from '@polocas/ui/i18n'

import cs from '@polocas/ui/locales/cs/common.json'
import en from '@polocas/ui/locales/en/common.json'

import './index.scss'

const render = (RootComponent: FC) => {
  const root = createRoot(document.getElementById('root'))
  root.render(<RootComponent />)
}

const startUp = () => {
  initLocalization({ cs, en })
  render(App)
}

startUp()
