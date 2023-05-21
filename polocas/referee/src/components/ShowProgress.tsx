import classnames from 'classnames'

export const ShowProgress = ({ children, side = 'left' }) => (
  <div className={classnames('d-flex', { 'ms-auto': side === 'right' })}>
    {children}
  </div>
)
