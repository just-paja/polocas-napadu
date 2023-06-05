import { Entity, TeamEntity } from './generics.js'

export enum ContestantType {
  Home = 'A_1',
  Guest = 'A_2',
}

export enum ContestantSide {
  Left = 'left',
  Right = 'right',
}

export interface ContestantGroup extends Entity {
  band: TeamEntity
  contestantType: ContestantType
}

export const getContestantTypeBySide = (
  side: ContestantSide,
): ContestantType => {
  if (side === ContestantSide.Left) {
    return ContestantType.Home
  } else if (side === ContestantSide.Right) {
    return ContestantType.Guest
  }
  throw new Error(
    `Unknown side, we support just ${ContestantSide.Left} and ${ContestantSide.Right}`,
  )
}

export const getContestantBySide = (
  contestants: ContestantGroup[],
  side: ContestantSide,
) => {
  const type = getContestantTypeBySide(side)
  return contestants.find((contestant) => contestant.contestantType === type)
}
