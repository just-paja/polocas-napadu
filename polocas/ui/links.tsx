import type { MouseEvent, ElementType, ReactNode } from 'react'

import { useCallback } from 'react'

interface ExternalLinkProps {
  children: ReactNode
  href?: string
  icon?: ElementType
}

export function ExternalLink({
  children,
  href,
  icon: Icon,
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
    <a href={href} rel='external' onClick={open}>
      {Icon && (
        <>
          <Icon />{' '}
        </>
      )}
      {children}
    </a>
  )
}
