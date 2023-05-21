import { BoardLayout } from './BoardLayout.js'
import { ContestantSide } from '@polocas/core/contestants'
import { ControlsLayout } from './ControlsLayout.js'
import { MainControls } from './MainControls.js'
import { Team } from './Team.js'

export const PauseStage = () => (
  <ControlsLayout>
    <BoardLayout>
      <Team side={ContestantSide.Left} />
      <Team side={ContestantSide.Right} />
    </BoardLayout>
    <MainControls center>
      <h1>Přestávka</h1>
    </MainControls>
  </ControlsLayout>
)
