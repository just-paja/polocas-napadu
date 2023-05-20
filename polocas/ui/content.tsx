import { createContext, useContext } from "react"

import { Children } from '@polocas/core/constants'

export const HeadingLevelContext = createContext(0)
export const useHeadingLevel = () => {
  try {
    useContext(HeadingLevelContext)
  } catch (_e) {
    return 0
  }
}

export const HeadingContext = ({ children, baseLevel }) => (
	<HeadingLevelContext.Provider value={baseLevel || 0}>
		{children}
	</HeadingLevelContext.Provider>
)

interface HeadingProps {
  level?: number
  relativeLevel?: number
  children: Children
}

export const Heading = ({ level, relativeLevel = 0, children, ...props }: HeadingProps) => {
	const headingLevel = useHeadingLevel()
	const Component = `h${level || Math.max(1, headingLevel + relativeLevel)}`
	return <Component {...props}>{children}</Component>
}

export const Section = ({
	children,
	component: Component = "section",
	headingLevel = 1,
	...props
}) => (
	<Component {...props}>
		<HeadingContext baseLevel={useHeadingLevel() + headingLevel}>
			{children}
		</HeadingContext>
	</Component>
)

export const Main = ({ children, ...props }) => (
	<Section {...props} component="main">
		{children}
	</Section>
)

export const Details = ({ children, ...props }) => (
	<Section {...props} component="details">
		{children}
	</Section>
)
