import styles from './ShowSetupStage.module.scss'

import { InspirationCount } from './InspirationCount.js'
import { InspirationQr } from './InspirationQr.js'
import { Teams } from './Teams.js'

export const ShowSetupStage = () => (
  <>
    <Teams hideScore />
    <div className="d-flex align-items-center justify-content-center">
      <InspirationQr className={styles.qr} />
    </div>
    <InspirationCount />
  </>
)
