import type { ReactNode } from 'react'

import { BoardLayout } from './BoardLayout.js'
import { ShowStageControls } from './ShowStageControls.js'

interface ControlsLayoutProps {
  children?: ReactNode
}

export function ControlsLayout({ children }: ControlsLayoutProps) {
  return (
    <BoardLayout layout='vertical'>
      {children}
      <ShowStageControls />
    </BoardLayout>
  )
}
