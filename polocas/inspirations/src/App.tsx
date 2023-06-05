import Container from 'react-bootstrap/Container'

import { Apollo } from '@polocas/ui/apollo'
import { FixedDialog } from '@polocas/ui/dialogs'
import { HashRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { ShowInspirations } from './ShowInspirations.js'
import { ShowList } from './ShowList.js'

export const App = () => {
  return (
    <HashRouter>
      <Apollo>
        <FixedDialog>
          <Container>
            <Routes>
              <Route path='/:showId' element={<ShowInspirations />} />
              <Route path='*' element={<ShowList />} />
            </Routes>
          </Container>
        </FixedDialog>
      </Apollo>
    </HashRouter>
  )
}
