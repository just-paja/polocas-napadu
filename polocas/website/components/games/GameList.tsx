import { Link } from '../links.js'
import { withTranslation } from '@polocas/ui/i18n'

export const GameList = withTranslation(({ gameRules, t }) => {
  return (
    <>
      <p>{t('gameRulesStats', { total: gameRules.length })}</p>
      <ul>
        {gameRules.map(rules => (
          <li key={rules.slug}>
            <Link route="gameDetail" params={{ slug: rules.slug }}>
              {rules.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
})
