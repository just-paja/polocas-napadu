import type { ComponentType, PropsWithChildren, ReactNode } from 'react'
import type { ClassName } from '@polocas/core/generics'

import { createContext, useContext } from 'react'

export const HeadingLevelContext = createContext(0)
export const useHeadingLevel = (): number => {
  try {
    return useContext(HeadingLevelContext)
  } catch (_e) {
    return 0
  }
}

type HeadingContextProps = PropsWithChildren<{
  baseLevel?: number
}>

export const HeadingContext = ({
  children,
  baseLevel,
}: HeadingContextProps) => (
  <HeadingLevelContext.Provider value={baseLevel || 0}>
    {children}
  </HeadingLevelContext.Provider>
)

interface HeadingProps extends JSX.IntrinsicAttributes {
  level?: number
  relativeLevel?: number
  children: ReactNode
}

export const Heading = ({
  level,
  relativeLevel = 0,
  children,
  ...props
}: HeadingProps) => {
  const headingLevel = useHeadingLevel()
  const Component = `h${level || Math.max(1, headingLevel + relativeLevel)}`
  return <Component {...props}>{children}</Component>
}

interface SectionProps extends JSX.IntrinsicAttributes {
  children: ReactNode
  className?: ClassName
  component?: ComponentType | string
  headingLevel?: number
}

export const Section = ({
  children,
  component: Component = 'section',
  headingLevel = 1,
  ...props
}: SectionProps) => (
  <Component {...props}>
    <HeadingContext baseLevel={useHeadingLevel() + headingLevel}>
      {children}
    </HeadingContext>
  </Component>
)

interface MainProps {
  children: ReactNode
  className?: ClassName
}

export const Main = ({ children, ...props }: MainProps) => (
  <Section {...props} component='main'>
    {children}
  </Section>
)

export const Details = ({ children, ...props }: MainProps) => (
  <Section {...props} component='details'>
    {children}
  </Section>
)
