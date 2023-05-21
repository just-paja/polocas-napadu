import styles from './ShowStageControls.module.scss'

import { ShowProgress } from './ShowProgress.js'
import { ShowStageControl } from './ShowStageControl.js'
import { ShowStageMenu } from './ShowStageMenu.js'
import { useMatch } from '@polocas/core/context'
import { GameStage } from '@polocas/core/gameStage'

const STAGE_MAP = {
  [GameStage.Finale]: [],
  [GameStage.GameResults]: [GameStage.GameSetup],
  [GameStage.GameSetup]: [GameStage.Game],
  [GameStage.Game]: [GameStage.GameResults],
  [GameStage.Intro]: [GameStage.GameSetup],
  [GameStage.Pause]: [GameStage.GameSetup],
  [GameStage.ShowSetup]: [GameStage.Intro],
}

export const ShowStageControls = () => {
  const { closed, currentStage, prevStage } = useMatch()

  const getForwardButtons = () => {
    const forward = currentStage
      ? STAGE_MAP[currentStage.type]
      : STAGE_MAP[STAGE_SHOW_SETUP]
    return forward || []
  }

  const renderControls = () => {
    const forward = getForwardButtons()
    return (
      <>
        {currentStage ? (
          <ShowProgress side="left">
            <ShowStageControl
              back
              stage={prevStage ? prevStage.type : STAGE_SHOW_SETUP}
            />
          </ShowProgress>
        ) : null}
        <ShowProgress side="right">
          <ShowStageControl
            forward={forward}
            component={ShowStageMenu}
            omit={[currentStage && currentStage.type, ...forward]}
          />
        </ShowProgress>
      </>
    )
  }

  return (
    <div className={styles.box}>
      {closed ? (
        <p className={styles.closed}>Zápas je uzavřen</p>
      ) : (
        renderControls()
      )}
    </div>
  )
}
