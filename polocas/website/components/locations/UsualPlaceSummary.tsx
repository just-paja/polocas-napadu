import React, { FC } from 'react'

import type { UsualPlace } from '@polocas/core/constants'

import { Markdown } from '@polocas/ui/text'
import { LocationAddress } from './LocationAddress'

interface UsualPlaceSummaryProps {
  place: UsualPlace
}

export const UsualPlaceSummary: FC<UsualPlaceSummaryProps> = ({ place }) => (
  <div>
    <h2>{place.name}</h2>
    <Markdown source={place.description} />
    <LocationAddress location={place.location} />
  </div>
)
