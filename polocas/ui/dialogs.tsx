import type { PropsWithChildren } from 'react'

import styles from './dialogs.module.scss'

export * from './dials.js'

type FixedDialogProps = PropsWithChildren<{}>

export const FixedDialog = ({ children }: FixedDialogProps) => (
  <div className={styles.fix}>
    <div className={styles.center}>{children}</div>
  </div>
)
