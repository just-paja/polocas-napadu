import { Apollo } from '@polocas/ui/apollo'
import { HashRouter } from 'react-router-dom'
import { MatchList } from './components/MatchList.js'
import { NotFound } from './components/NotFound.js'
import { Routes, Route } from 'react-router'
import { SpectatorView } from './components/SpectatorView.js'

export const App = () => (
  <HashRouter>
    <Apollo>
      <Routes>
        <Route path='/' exact element={<MatchList />} />
        <Route path='/match/:matchId' exact element={<SpectatorView />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Apollo>
  </HashRouter>
)
