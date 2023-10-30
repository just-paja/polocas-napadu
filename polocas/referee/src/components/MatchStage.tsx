import type { Stage } from '@polocas/core/constants'

import { FinaleStage } from './FinaleStage.js'
import { GameResultsStage } from './GameResultsStage.js'
import { GameSetupStage } from './GameSetupStage.js'
import { GameStage as GameStageComponent } from './GameStage.js'
import { GameStage } from '@polocas/core/gameStage'
import { gql, useQuery } from '@apollo/client'
import { IntroStage } from './IntroStage.js'
import { MatchContext } from '@polocas/core/context'
import { PauseStage } from './PauseStage.js'
import { ShowSetupStage } from './ShowSetupStage.js'
import { useParams } from 'react-router'

const getMatch = gql`
  query MatchStage($matchId: Int!) {
    match(id: $matchId) {
      id
      preparedInspirationCount
      show {
        name
        start
      }
      closed
      contestantGroups {
        id
        contestantType
        score
        color
        logo
        scorePoints
        penaltyPoints
        band {
          name
        }
        players {
          id
          profile {
            name
          }
        }
      }
      currentStage {
        id
        created
        type
        game {
          type
          inspirations {
            id
            text
          }
          rules {
            id
            name
          }
        }
        inspirations {
          id
          text
        }
      }
      prevStage {
        type
      }
    }
  }
`

const getStageView = (stage: Stage) => {
  if (stage) {
    if (stage.type === GameStage.Intro) {
      return <IntroStage />
    }
    if (stage.type === GameStage.Finale) {
      return <FinaleStage />
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

const DEFAULT_POLL_INTERVAL = 500

export function MatchStage() {
  const params = useParams()
  const { data, error, loading } = useQuery(getMatch, {
    pollInterval: DEFAULT_POLL_INTERVAL,
    variables: {
      ...params,
    },
  })
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error!</div>
  }
  return (
    <MatchContext.Provider value={data.match}>
      {getStageView(data.match?.currentStage)}
    </MatchContext.Provider>
  )
}
