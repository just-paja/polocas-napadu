import { Button } from '@polocas/ui/buttons'
import { useMatch } from '@polocas/core/context'
import { GameStage, StageOptions } from '@polocas/core/gameStage'

const getStageLabel = stage => {
  const option = StageOptions.find(o => o.value === stage)
  return option && option.label
}

const isStageReady = (stage, currentStage) => {
  if (stage === GameStage.Game) {
    return Boolean(currentStage.game)
  }
  return true
}

export const ShowStageButton = ({ back, mutate, stage, ...props }) => {
  const { id, currentStage } = useMatch()
  const handleClick = () =>
    mutate({
      refetchQueries: ['MatchStage'],
      variables: {
        matchId: id,
        stage,
      },
    })
  return (
    <Button
      {...props}
      disabled={!isStageReady(stage, currentStage)}
      iconRight={!back}
      onClick={handleClick}
    >
      {getStageLabel(stage)}
    </Button>
  )
}
