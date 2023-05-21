import { BoardLayout } from './BoardLayout.js'
import { ContestantSide } from '@polocas/core/contestants'
import { ControlsLayout } from './ControlsLayout.js'
import { GameSelection } from './GameSelection.js'
import { gql, useMutation } from '@apollo/client'
import { Heading } from '@polocas/ui/content'
import { InspirationSelection } from './InspirationSelection.js'
import { MainControls } from './MainControls.js'
import { Team } from './Team.js'
import { useMatch } from '@polocas/core/context'

const SET_GAME = gql`
  mutation SetMatchGame($matchId: Int!, $gameRulesId: Int) {
    setMatchGame(matchId: $matchId, gameRulesId: $gameRulesId) {
      ok
    }
  }
`

export const GameSetupStage = () => {
  const [setGame, { loading }] = useMutation(SET_GAME)
  const match = useMatch()
  const handleChange = value =>
    setGame({
      refetchQueries: ['MatchStage'],
      variables: {
        gameRulesId: value ? value.id : null,
        matchId: match.id,
      },
    })

  return (
    <ControlsLayout>
      <BoardLayout>
        <Team side={ContestantSide.Left} />
        <Team side={ContestantSide.Right} />
      </BoardLayout>
      <MainControls center>
        <h1>Nastavení kategorie</h1>
        <p>Rozhodčí určuje jaká kategorie se bude hrát a vybírá téma</p>

        {match.closed ? null : (
          <>
            <GameSelection
              onChange={handleChange}
              saving={loading}
              value={match.currentStage.game && match.currentStage.game.rules}
            />
            <Heading>Inspirace ({match.preparedInspirationCount})</Heading>
            <InspirationSelection />
          </>
        )}
      </MainControls>
    </ControlsLayout>
  )
}
