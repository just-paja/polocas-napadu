import styles from './FinaleStage.module.scss'

import { Teams } from './Teams.js'
import { GameHistory } from './GameHistory.js'

export const FinaleStage = () => (
  <div>
    <Teams />
    <p className={styles.text}>Děkujeme, přijďte zas!</p>
    <div className={styles.center}>
      <GameHistory />
    </div>
    <p className={styles.text}>www.polocas-napadu.cz</p>
  </div>
)
