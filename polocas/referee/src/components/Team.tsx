import type { ReactNode } from 'react'

import { ContestantSide } from '@polocas/core/contestants'
import { getContestantTypeBySide } from '@polocas/core/contestants'
import { TeamDetails } from './TeamDetails.js'
import { useMatch } from '@polocas/core/context'

interface TeamProps {
  children?: ReactNode
  side: ContestantSide
}

export function Team({ children, side }: TeamProps) {
  const { contestantGroups } = useMatch()
  const contestantType = getContestantTypeBySide(side)
  const team = contestantGroups?.find(
    (group) => group.contestantType === contestantType,
  )

  if (!team) {
    return null
  }

  return (
    <div className='fs-3 p-3' style={{ backgroundColor: team.color }}>
      <TeamDetails team={team} />
      {children}
    </div>
  )
}
