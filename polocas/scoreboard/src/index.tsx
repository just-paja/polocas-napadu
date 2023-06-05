import type { FC } from 'react'

import { createRoot } from 'react-dom/client'
import { App } from './App.js'

import '@polocas/ui/global.scss'

const render = (RootComponent: FC) => {
  const root = createRoot(document.getElementById('root'))
  root.render(<RootComponent />)
}

const startUp = () => {
  render(App)
}

startUp()
