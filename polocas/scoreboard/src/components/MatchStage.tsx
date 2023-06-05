import { gql } from '@apollo/client'
import { MatchContext } from '@polocas/core/context'
import { withQuery } from '@polocas/ui/apollo'
import { GameStage } from '@polocas/core/gameStage'

import { FinaleStage } from './FinaleStage'
import { GameResultsStage } from './GameResultsStage'
import { GameSetupStage } from './GameSetupStage'
import { GameStage as GameStageComponent } from './GameStage'
import { IntroStage } from './IntroStage'
import { PauseStage } from './PauseStage'
import { ShowSetupStage } from './ShowSetupStage'

const GET_MATCH_STAGE = gql`
  query Stage($matchId: Int!) {
    match(id: $matchId) {
      contestantGroups {
        id
        contestantType
        score
        color
        penaltyPoints
        logo
        band {
          name
        }
      }
      currentStage {
        type
        game {
          type
          inspirations {
            text
          }
        }
        scorePointPoll {
          id
          closed
          votings {
            id
            closed
            contestantGroup {
              id
              color
              band {
                name
              }
            }
            volumeScrapes {
              created
              volume
            }
          }
        }
        inspirations {
          text
        }
      }
      show {
        totalInspirations
      }
    }
  }
`

const getStageView = (stage) => {
  if (stage) {
    if (stage.type === GameStage.Finale) {
      return <FinaleStage />
    }
    if (stage.type === GameStage.Intro) {
      return <IntroStage />
    }
    if (stage.type === GameStage.Pause) {
      return <PauseStage />
    }
    if (stage.type === GameStage.GameResults) {
      return <GameResultsStage />
    }
    if (stage.type === GameStage.Game) {
      return <GameStageComponent />
    }
    if (stage.type === GameStage.GameSetup) {
      return <GameSetupStage />
    }
  }
  return <ShowSetupStage />
}

export const MatchStage = withQuery(
  ({ data }) => (
    <MatchContext.Provider value={data.match}>
      {getStageView(data.match.currentStage)}
    </MatchContext.Provider>
  ),
  GET_MATCH_STAGE,
  true,
)
