import type { ElementType, MouseEvent, ReactNode } from 'react'

import NextLink from 'next/link'
import React, { cloneElement, useCallback } from 'react'

import { reverse } from '../routes'
import { qsm } from 'query-string-manipulator'
import { useRouter } from 'next/router'
import { useI18n } from '@polocas/next/i18n'

export function openExternalUrl(
  e: MouseEvent<HTMLAnchorElement>,
  url: string,
): void {
  const target = url || (e.target as HTMLAnchorElement).href
  if (target && !target.match(/^mailto:/)) {
    e.preventDefault()
    window.open(target)
  }
}

interface LinkerProps {
  activeProp?: string
  children: ReactNode
  href?: string
  query?: Record<string, string | number | boolean>
  params?: Record<string, string | number | boolean>
  route?: string
}

export function Linker({
  activeProp,
  children,
  href,
  query,
  params,
  route,
}: LinkerProps) {
  const { i18n } = useI18n()
  const router = useRouter()
  const target = route
    ? qsm(reverse(i18n.resolvedLanguage, route, params), { set: query })
    : href

  let extraProps = null
  if (activeProp) {
    extraProps = {}
    const routerPath = `/${i18n.resolvedLanguage}${router.asPath}`
    extraProps[activeProp] = routerPath.startsWith(`${target}/`)
  }

  return (
    <NextLink href={target} passHref legacyBehavior>
      {cloneElement(children, { ...extraProps })}
    </NextLink>
  )
}

interface LinkProps {
  activeProp?: string
  as?: ElementType
  children: ReactNode
  disabled?: boolean
  external?: boolean
  href?: string
  params?: Record<string, string>
  query?: Record<string, string | number | boolean>
  route?: string
}

export function Link({
  activeProp,
  as: As = 'a',
  children,
  external,
  href,
  params,
  query,
  route,
  ...props
}: LinkProps) {
  const comp = (
    <As {...props} onClick={external && openExternalUrl}>
      {children}
    </As>
  )
  return props.disabled ? (
    comp
  ) : (
    <Linker
      activeProp={activeProp}
      href={href}
      params={params}
      query={query}
      route={route}
    >
      {comp}
    </Linker>
  )
}

interface OptionalLinkProps extends LinkProps {
  isLink?: boolean
  fallbackComponent: ElementType
}

export function OptionalLink({
  fallbackComponent: Component = React.Fragment,
  children,
  isLink,
  ...props
}: OptionalLinkProps) {
  return isLink ? (
    <Link {...props}>{children}</Link>
  ) : (
    <Component>{children}</Component>
  )
}
