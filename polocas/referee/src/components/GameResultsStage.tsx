import { BoardLayout } from './BoardLayout.js'
import { ControlsLayout } from './ControlsLayout.js'
import { MainControls } from './MainControls.js'
import { ScoreControls } from './ScoreControls.js'
import { Team } from './Team.js'
import { ContestantSide } from '@polocas/core/contestants'

export const GameResultsStage = () => (
  <ControlsLayout>
    <BoardLayout>
      <Team side={ContestantSide.Left}>
        <ScoreControls side={ContestantSide.Left} />
      </Team>
      <Team side={ContestantSide.Right}>
        <ScoreControls side={ContestantSide.Right} />
      </Team>
    </BoardLayout>
    <MainControls center>
      <h1>Hlasování</h1>
      <p>V této fázi hry diváci hlasují o tom který tým dostane bod.</p>
    </MainControls>
  </ControlsLayout>
)
