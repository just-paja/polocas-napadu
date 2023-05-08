import Container from 'react-bootstrap/Container'
import React from 'react'

import { FixedDialog } from '@polocas-napadu/ui/dialogs'
import { HashRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router'
import { ShowInspirations } from './ShowInspirations'
import { ShowList } from './ShowList'

export const App = () => {
  return (
    <FixedDialog>
      <Container>
        <HashRouter>
          <Routes>
            <Route path="/:showId" exact element={<ShowInspirations />} />
            <Route path="*" element={<ShowList />} />
          </Routes>
        </HashRouter>
      </Container>
    </FixedDialog>
  )
}
