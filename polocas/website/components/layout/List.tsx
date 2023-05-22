import classnames from 'classnames'
import styles from './List.module.scss'

export function List({ as: Component, className, children }) {
  return (
    <Component className={classnames(styles.list, className)}>
      {children}
    </Component>
  )
}

List.defaultProps = {
  as: 'div',
}
