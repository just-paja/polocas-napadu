import { Apollo } from '@polocas/ui/apollo'
import { Routes, Route } from 'react-router'
import { HashRouter } from 'react-router-dom'
import { NotFound } from './components/NotFound.js'
import { RefereeView } from './components/RefereeView.js'

export const App = () => (
  <HashRouter>
    <Apollo>
      <Routes>
        <Route path='/match/:matchId' element={<RefereeView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Apollo>
  </HashRouter>
)
