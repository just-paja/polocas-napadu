import type { ReactNode } from 'react'

import classnames from 'classnames'
import styles from './BoardLayout.module.scss'

interface BoardLayoutProps {
  children?: ReactNode
  layout?: 'horizontal' | 'vertical'
}

export function BoardLayout({
  children,
  layout = 'horizontal',
}: BoardLayoutProps) {
  return (
    <div className={classnames(styles.layout, styles[layout])}>{children}</div>
  )
}
