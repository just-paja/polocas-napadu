import { createRoot } from 'react-dom/client'
import { App } from './App.js'
import { initLocalization } from '@polocas/ui/i18n'

import cs from '@polocas/ui/locales/cs/common.json'
import en from '@polocas/ui/locales/en/common.json'

import '@polocas/ui/global.scss'

const render = RootComponent => {
  const root = createRoot(document.getElementById('root'))
  root.render(
      <RootComponent />
  )
}

const startUp = () => {
  initLocalization({ cs, en })
  render(App)
}

startUp()
