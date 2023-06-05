import { useMatch } from '@polocas/core/context'
import { TeamDetails } from './TeamDetails.js'
import { ContestantType } from '@polocas/core/contestants'

const getGroup = (groups, type) =>
  groups.find((group) => group.contestantType === type)

export const Teams = ({ hideScore = false }) => {
  const { contestantGroups, currentStage } = useMatch()
  const home = getGroup(contestantGroups, ContestantType.Home)
  const guest = getGroup(contestantGroups, ContestantType.Guest)

  const dimmTeam = (contestantGroupId) => {
    if (currentStage && currentStage.scorePointPoll) {
      return currentStage.scorePointPoll.votings.some(
        (voting) =>
          voting.contestantGroup &&
          voting.contestantGroup.id !== contestantGroupId &&
          !voting.closed,
      )
    }
    return false
  }

  return (
    <div className='d-flex justify-content-center w-100'>
      {home && (
        <TeamDetails
          dimm={dimmTeam(home.id)}
          hideScore={hideScore}
          side='left'
          team={home}
        />
      )}
      {guest && (
        <TeamDetails
          dimm={dimmTeam(guest.id)}
          hideScore={hideScore}
          side='right'
          team={guest}
        />
      )}
    </div>
  )
}
