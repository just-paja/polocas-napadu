/* eslint-disable no-console */
export const logError = (error) => {
	console.error(error)
}

export const logWarning = (error) => {
	console.warn(error)
}

export const compatLogWarning = (_next, error) => {
	logWarning(error)
}
