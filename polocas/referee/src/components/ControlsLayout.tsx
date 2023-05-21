import { BoardLayout } from './BoardLayout.js'
import { ShowStageControls } from './ShowStageControls.js'

export const ControlsLayout = ({ children }) => (
  <BoardLayout layout="vertical">
    {children}
    <ShowStageControls />
  </BoardLayout>
)
