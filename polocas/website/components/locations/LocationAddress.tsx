import React, { FC } from 'react'
import styles from './LocationAddress.module.scss'

import type { Location } from '@polocas-napadu/core/constants'
import { Address } from './Address'

interface LocationAddressProps {
  location: Location
}

export const LocationAddress: FC<LocationAddressProps> = ({ location }) => (
  <div className={styles.location}>
    <strong>{location.name}</strong>
    <Address address={location.address} />
  </div>
)
