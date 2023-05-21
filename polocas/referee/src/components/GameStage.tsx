import { BoardLayout } from './BoardLayout.js'
import { ContestantSide } from '@polocas/core/contestants'
import { ControlsLayout } from './ControlsLayout.js'
import { InspirationList } from './InspirationList.js'
import { MainControls } from './MainControls.js'
import { Team } from './Team.js'
import { Timer } from './Timer.js'
import { useMatch } from '@polocas/core/context'

export const GameStage = () => {
  const { currentStage } = useMatch()
  return (
    <ControlsLayout>
      <BoardLayout>
        <Team side={ContestantSide.Left} />
        <Team side={ContestantSide.Right} />
      </BoardLayout>
      <MainControls center>
        <p>Právě probíhá kategorie</p>
        <h1>{currentStage.game.rules.name}</h1>
        <Timer start={currentStage.created} />
        <InspirationList
          inspirations={currentStage.game.inspirations}
          readOnly
        />
      </MainControls>
    </ControlsLayout>
  )
}
