export enum Visibility {
  Private = 'A_1',
  Public = 'A_2',
  Deleted = 'A_3',
}

export interface VisibilityObject {
  visibility: Visibility
}

export const isVisible = (obj: VisibilityObject) =>
  obj.visibility === Visibility.Public
