import React from 'react'

import { Link } from '../links'
import { getStageOption, STAGE_GAME } from './stages'
import { withTranslation } from '@polocas/ui/i18n'

function getGameLabel(stage) {
  if (stage.game && stage.game.rules) {
    const inspirations = getGameInspirations(stage)
    const name = (
      <Link route='gameDetail' params={{ slug: stage.game.rules.slug }}>
        {stage.game.rules.name}
      </Link>
    )
    return inspirations ? (
      <>
        {name} ({inspirations})
      </>
    ) : (
      name
    )
  }
  return null
}

function getGameInspirations(stage) {
  if (stage.game && stage.game.inspirations) {
    return stage.game.inspirations
      .map((inspiration) => inspiration.text)
      .join(', ')
  }
  return null
}

export const MatchStage = withTranslation(({ stage, t }) => {
  const stageOption = getStageOption(stage)
  if (!stageOption) {
    return null
  }
  const stageLabel = t(`stage_${stage.type}`)
  return <>{stage.type === STAGE_GAME ? getGameLabel(stage) : stageLabel}</>
})
