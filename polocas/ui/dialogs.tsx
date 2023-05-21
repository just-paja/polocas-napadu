import styles from "./dialogs.module.scss"

export * from './dials.js'

export const FixedDialog = ({ children }) => (
	<div className={styles.fix}>
		<div className={styles.center}>{children}</div>
	</div>
)
