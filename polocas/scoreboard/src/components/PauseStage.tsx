import styles from './PauseStage.module.scss'

import { GameHistory } from './GameHistory.js'
import { Teams } from './Teams.js'

export const PauseStage = () => (
  <>
    <Teams />
    <p className={styles.text}>V první půlce jste viděli</p>
    <div className={styles.center}>
      <GameHistory />
    </div>
  </>
)
