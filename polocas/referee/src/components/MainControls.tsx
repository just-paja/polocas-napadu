import type { ReactNode } from 'react'

import classnames from 'classnames'
import styles from './MainControls.module.scss'

import { MatchSpeedDial } from './MatchSpeedDial.js'
import { useMatch } from '@polocas/core/context'

interface MainControlsProps {
  center?: boolean
  children?: ReactNode
}

export function MainControls({ center = false, children }: MainControlsProps) {
  const { closed } = useMatch()
  return (
    <div className={classnames(styles.form, { 'text-center': center })}>
      {closed ? null : (
        <MatchSpeedDial className={styles.dial} label='Přidat' />
      )}
      {children}
    </div>
  )
}
