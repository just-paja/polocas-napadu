import type { ElementType, ReactNode } from 'react'
import type { ClassName } from '@polocas/core/generics'

import classnames from 'classnames'
import Container from 'react-bootstrap/Container'
import styles from './ContentContainer.module.scss'

interface ContentContainerProps {
  as?: ElementType,
  children: ReactNode,
  className?: ClassName,
  column?: boolean,
}

export function ContentContainer({
  as,
  children,
  className,
  column,
  ...props
}: ContentContainerProps) {
  return (
    <Container
      as={as}
      className={classnames({ [styles.column]: column }, className)}
      {...props}
    >
      {children}
    </Container>
  )
}
