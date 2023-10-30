import { BoardLayout } from './BoardLayout.js'
import { ContestantSide } from '@polocas/core/contestants'
import { ControlsLayout } from './ControlsLayout.js'
import { Heading } from '@polocas/ui/content'
import { MainControls } from './MainControls.js'
import { Team } from './Team.js'
import { useI18n } from '@polocas/ui/i18n'

export const FinaleStage = () => {
  const { t } = useI18n()
  return (
    <ControlsLayout>
      <BoardLayout>
        <Team side={ContestantSide.Left} />
        <Team side={ContestantSide.Right} />
      </BoardLayout>
      <MainControls center>
        <Heading>{t('matchWasClosed')}</Heading>
      </MainControls>
    </ControlsLayout>
  )
}
