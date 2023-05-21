import { BoardLayout } from './BoardLayout.js'
import { ContestantSide } from '@polocas/core/contestants'
import { ControlsLayout } from './ControlsLayout.js'
import { Heading } from '@polocas/ui/content'
import { MainControls } from './MainControls.js'
import { Team } from './Team.js'
import { useTranslation } from 'react-i18next'

export const FinaleStage = () => {
  const { t } = useTranslation()
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
