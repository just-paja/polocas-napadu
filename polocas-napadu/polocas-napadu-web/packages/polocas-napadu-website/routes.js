const routes = require('next-routes')
const router = routes()

const paths = {
  cs: {
    home: '/',
    about: '/o-nas',
    article: '/clanek/:slug',
    contact: '/kontakt',
    gameDetail: '/short-formy/kategorie/:slug',
    gameList: '/short-formy/kategorie',
    profile: '/clen/:slug',
    repertoir: '/repertoar',
    showDetail: '/predstaveni/:slug',
    showFormatDetail: '/repertoar/:slug',
    showList: '/predstaveni'
  },
  en: {
    home: '/',
    about: '/about',
    article: '/article/:slug',
    contact: '/contact',
    gameDetail: '/short-forms/games/:slug',
    gameList: '/short-forms/games',
    profile: '/member/:slug',
    repertoir: '/repertoir',
    showDetail: '/shows/:slug',
    showFormatDetail: '/repertoir/:slug',
    showList: '/shows'
  }
}

function getRoutePattern (language, routeName) {
  if (!paths[language]) {
    throw new Error(`Unsupported language: ${language}`)
  }
  if (!paths[language][routeName]) {
    throw new Error(`Unknown path: ${language}/${routeName}`)
  }
  const path = paths[language][routeName]
  return `/${language}${path === '/' ? '' : path}`
}

function registerPatterns (router, language) {
  Object.keys(paths[language]).forEach((routeName) => {
    const route = {
      name: `${language}-${routeName}`,
      page: routeName,
      pattern: getRoutePattern(language, routeName)
    }
    router.add(route)
  })
}

function registerLanguages (router) {
  Object.keys(paths).forEach((language) => {
    registerPatterns(router, language)
  })
}

registerLanguages(router)

router.getRoutePattern = getRoutePattern

module.exports = router
