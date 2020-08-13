import BoardLayout from './BoardLayout'
import ControlsLayout from './ControlsLayout'
import MainControls from './MainControls'
import React from 'react'
import Team from './Team'

import { Classes } from 'polocas-napadu-core/proptypes'
import { withStyles } from '@material-ui/core/styles'
import { TEAM_SIDE_LEFT, TEAM_SIDE_RIGHT } from 'polocas-napadu-core/constants'

const styles = {
  inspiration: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center'
  }
}

const PauseStage = ({ classes }) => (
  <ControlsLayout>
    <BoardLayout>
      <Team side={TEAM_SIDE_LEFT} />
      <Team side={TEAM_SIDE_RIGHT} />
    </BoardLayout>
    <MainControls center>
      <h1>Přestávka</h1>
    </MainControls>
  </ControlsLayout>
)

PauseStage.propTypes = {
  classes: Classes.isRequired
}

export default withStyles(styles)(PauseStage)
