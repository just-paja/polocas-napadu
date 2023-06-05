import { createRedirectApp } from './app.js'
import { createServer } from 'http'

const app = createRedirectApp(process.env.REDIRECTS || '[]')
const server = createServer(app)
const port = process.env.PORT || 3000

server.listen(port)
process.stdout.write(`Listening on server ${port}\n`)
