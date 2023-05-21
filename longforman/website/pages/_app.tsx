import type { FC } from 'react'

import '../styles/globals.css'

interface LongformanAppProps {
  Component: FC
  pageProps: object
}

const LongformanApp: FC<LongformanAppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
}

export default LongformanApp
