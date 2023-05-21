import { AddIcon, SubtractIcon } from '@polocas/ui/icons'
import { Button } from '@polocas/ui/buttons'
import { getContestantBySide } from '@polocas/core/contestants'
import { gql, useMutation } from '@apollo/client'
import { useMatch } from '@polocas/core/context'

const CHANGE_SCORE = gql`
  mutation ChangeScore($contestantGroupId: Int!, $subtract: Boolean) {
    changeContestantGroupScore(
      contestantGroupId: $contestantGroupId
      subtract: $subtract
    ) {
      ok
    }
  }
`

export const ScoreControls = ({ side }) => {
  const { contestantGroups } = useMatch()
  const [addScore, addProps] = useMutation(CHANGE_SCORE)
  const [subtractScore, subtractProps] = useMutation(CHANGE_SCORE)
  const contestantGroup = getContestantBySide(contestantGroups, side)
  const loading = addProps.loading || subtractProps.loading
  const handleClick = method => () =>
    method({
      refetchQueries: ['MatchStage'],
      variables: {
        contestantGroupId: contestantGroup.id,
        subtract: method === subtractScore,
      },
    })
  return (
    <div className="d-flex justify-content-center pt-3">
      <Button
        disabled={loading}
        icon={<AddIcon />}
        loading={addProps.loading}
        onClick={handleClick(addScore)}
      />
      <Button
        disabled={loading || contestantGroup.scorePoints === 0}
        icon={<SubtractIcon />}
        loading={subtractProps.loading}
        onClick={handleClick(subtractScore)}
      />
    </div>
  )
}
