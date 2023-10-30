import React from 'react'

import { Link } from '../links'
import { getStageOption, STAGE_GAME } from './stages'
import { useI18n } from '@polocas/next/i18n'

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

export function MatchStage({ stage }) {
  const { t } = useI18n()
  const stageOption = getStageOption(stage)
  if (!stageOption) {
    return null
  }
  const stageLabel = t(`stage_${stage.type}`)
  return <>{stage.type === STAGE_GAME ? getGameLabel(stage) : stageLabel}</>
}
