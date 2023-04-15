import express from 'express'

export interface Redirect {
  permanent?: boolean;
  test: string;
  target: string;  
}

const parseProtocol = (req: IncomingMessage): string => req.secure ? 'https' : 'http'
const parseRegex = (str: string): RegExp => new RegExp(str)
const parseRedirect = (obj: object) => ({ ...obj, test: parseRegex(obj.test) })
const parseRedirects = (str: string): Redirect[] => JSON.parse(str).map(parseRedirect)
const translateHost = (target: string, match): (string|null) => match.reduce(
  (aggr, value, index) => aggr.replace(new RegExp(`\\$${index}`, 'g'), value),
  target
)

const translateRedirect = (req: IncomingMessage, redirect: Redirect): boolean => {
  const match = redirect.test.exec(req.get('host'))
  if (match) {
    const host = translateHost(redirect.target, match)
    return `${parseProtocol(req)}://${host}${req.originalUrl}`
  }
  return null
}

export const createRedirectApp = (redirectsStr: str) => {
  const app = express()
  const redirects: DomainRedirect[] = parseRedirects(redirectsStr)
  app.use((req, res) => {
    try {
      for (const redirect of redirects) {
        const target = translateRedirect(req, redirect)
        if (target) {
          return res.redirect(redirect.permanent ? 302 : 301, target)
        }
      }
      return res.status(404).send('Not Found')  
    } catch(e) {
      res.setatus(500).send('Internal Server Error')
      console.error(e)
    }
  })
  return app
}