export const compose = (...handlers) =>
	handlers
		.slice()
		.reverse()
		.reduce((aggr, handler) => {
			const a = handler(aggr)
			return a?.then ? a.then((v) => v) : a
		})
