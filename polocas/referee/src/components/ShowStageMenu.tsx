import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Dropdown from 'react-bootstrap/Dropdown'

import { ShowStageControl } from './ShowStageControl.js'
import { StageOptions, StageJumpOptions } from '@polocas/core/gameStage'
import { useMatch } from '@polocas/core/context'
import { useTranslation } from 'react-i18next'

const ShowStageMenuItem = ({ matchId, mutate, option }) => {
  const { t } = useTranslation()
  const handleClick = () =>
    mutate({
      refetchQueries: ['MatchStage'],
      variables: {
        matchId,
        stage: option.value,
      },
    })

  return (
    <Dropdown.Item key={option.value} onClick={handleClick}>
      {t(`stage_${option.value}`)}
    </Dropdown.Item>
  )
}

const mapStageToButton = (stage) => (
  <ShowStageControl key={stage} stage={stage} />
)

export const ShowStageMenu = ({ forward, mutate, omit }) => {
  const { t } = useTranslation()
  const match = useMatch()
  return (
    <ButtonGroup>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle>{t('matchOptions')}</Dropdown.Toggle>
        <Dropdown.Menu>
          {StageOptions.filter(
            (option) =>
              StageJumpOptions.indexOf(option.value) !== -1 &&
              omit.indexOf(option.value) === -1,
          ).map((option) => (
            <ShowStageMenuItem
              key={option.value}
              matchId={match.id}
              mutate={mutate}
              option={option}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {forward.map(mapStageToButton)}
    </ButtonGroup>
  )
}
