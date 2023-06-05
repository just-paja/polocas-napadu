type Handler = (...args: any[]) => any

export const compose = (...handlers: Handler[]) =>
  handlers
    .slice()
    .reverse()
    .reduce((aggr, handler) => {
      const a = handler(aggr)
      return a?.then ? a.then((v: any) => v) : a
    })
