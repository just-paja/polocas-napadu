import { Link } from '../links.js'
import { useI18n } from '@polocas/next/i18n'

export function GameList({ gameRules }) {
  const { t } = useI18n()
  return (
    <>
      <p>{t('gameRulesStats', { total: gameRules.length })}</p>
      <ul>
        {gameRules.map((rules) => (
          <li key={rules.slug}>
            <Link route='gameDetail' params={{ slug: rules.slug }}>
              {rules.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
