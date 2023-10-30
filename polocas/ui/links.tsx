import classnames from 'classnames'

import type { MouseEvent, ElementType, ReactNode } from 'react'
import type { ClassName } from '@polocas/core/generics'

import { useCallback } from 'react'

interface ExternalLinkProps {
  className?: ClassName
  children: ReactNode
  href?: string
  icon?: ElementType
}

export function ExternalLink({
  className,
  children,
  href,
  icon: Icon,
  ...props
}: ExternalLinkProps) {
  if (!href) {
    return null
  }
  const open = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.preventDefault()
      window.open(href)
    },
    [href],
  )
  return (
    <a
      {...props}
      className={classnames(className)}
      href={href}
      rel='external'
      onClick={open}
    >
      {Icon && (
        <>
          <Icon />{' '}
        </>
      )}
      {children}
    </a>
  )
}
