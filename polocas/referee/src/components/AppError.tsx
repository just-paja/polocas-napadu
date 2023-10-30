import { ErrorMessage } from '@polocas/core/constants'

export const AppError = ({ error = null }: { error: ErrorMessage }) => {
  if (!error) {
    return null
  }
  if (error instanceof Error) {
    return <span>{error.message}</span>
  }
  return <span>{String(error)}</span>
}
