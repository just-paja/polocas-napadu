import { BoardLayout } from './BoardLayout.js'
import { ContestantSide } from '@polocas/core/contestants'
import { ControlsLayout } from './ControlsLayout.js'
import { MainControls } from './MainControls.js'
import { Team } from './Team.js'

export const IntroStage = () => (
  <ControlsLayout>
    <BoardLayout layout="horizontal">
      <Team side={ContestantSide.Left} />
      <Team side={ContestantSide.Right} />
    </BoardLayout>
    <MainControls center>
      <h1>Intro</h1>
      <p>
        Během intra sportovní komentátoři udělají prognózu zápasu a poté probíhá
        veřejná rozcvička.
      </p>
    </MainControls>
  </ControlsLayout>
)
