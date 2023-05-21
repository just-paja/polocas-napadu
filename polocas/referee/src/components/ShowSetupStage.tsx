import { BoardLayout } from './BoardLayout.js'
import { ContestantSide } from '@polocas/core/contestants'
import { ControlsLayout } from './ControlsLayout.js'
import { MainControls } from './MainControls.js'
import { Team } from './Team.js'

export const ShowSetupStage = () => (
  <ControlsLayout>
    <BoardLayout>
      <Team side={ContestantSide.Left} />
      <Team side={ContestantSide.Right} />
    </BoardLayout>
    <MainControls center>
      <h1>Příprava zápasu</h1>
      <p>
        Na hlavní obrazovce je vidět QR kód s odkazem na zadání témat. Čekáme na
        příchod sportovních komentátorů nebo konferenciéra.
      </p>
    </MainControls>
  </ControlsLayout>
)
