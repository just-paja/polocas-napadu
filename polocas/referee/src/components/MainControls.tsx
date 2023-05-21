import classnames from 'classnames'
import styles from './MainControls.module.scss'

import { MatchSpeedDial } from './MatchSpeedDial.js'
import { useMatch } from '@polocas/core/context'

export const MainControls = ({ center = false, children }) => {
  const { closed } = useMatch()
  return (
    <div className={classnames(styles.form, { 'text-center': center })}>
      {closed ? null : (
        <MatchSpeedDial className={styles.dial} label="Přidat" />
      )}
      {children}
    </div>
  )
}
