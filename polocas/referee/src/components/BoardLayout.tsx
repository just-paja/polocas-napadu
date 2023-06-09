import classnames from 'classnames'
import styles from './BoardLayout.module.scss'

export const BoardLayout = ({ children, layout = 'horizontal' }) => (
  <div className={classnames(styles.layout, styles[layout])}>{children}</div>
)
