const express = require('express')
const next = require('next')
const nextI18NextMiddleware = require('next-i18next/middleware')
const routes = require('./routes')

const nextI18next = require('./lib/i18n')

const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = routes.getRequestHandler(app);

(async () => {
  await app.prepare()
  const server = express()

  server.use(nextI18NextMiddleware(nextI18next))
  server.use(handle)

  await server.listen(3000)
  console.log('>>>> Ready on http://localhost:3000') // eslint-disable-line no-console
})()