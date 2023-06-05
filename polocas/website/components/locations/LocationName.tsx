import React, { FC } from 'react'

import type { Location } from '@polocas-napadu/core/constants'

interface LocationNameProps {
  location: Location
}

export const LocationName: FC<LocationNameProps> = ({ location }) => (
  <>
    {location.city ? `${location.city}, ` : ''}
    {location.name}
  </>
)
