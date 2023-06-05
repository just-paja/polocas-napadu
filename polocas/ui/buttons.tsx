import type { MouseEventHandler, ReactNode } from 'react'

import { Button as BsButton } from 'react-bootstrap'
import { Overlay } from 'react-bootstrap'
import { Tooltip } from 'react-bootstrap'
import classnames from 'classnames'
import { Spinner } from 'react-bootstrap'
import styles from './buttons.module.scss'

import { forwardRef, useImperativeHandle, useRef, useState } from 'react'

export interface ButtonProps {
  className?: string
  children?: ReactNode | ReactNode[]
  disabled?: boolean
  icon?: ReactNode | ReactNode[]
  iconRight?: boolean
  iconOnly?: boolean
  loading?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  onMouseOut?: MouseEventHandler<HTMLButtonElement>
  onMouseOver?: MouseEventHandler<HTMLButtonElement>
  size?: 'sm' | 'lg'
  type?: 'button' | 'submit'
  variant?: string
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      icon,
      iconRight = false,
      iconOnly,
      loading,
      ...props
    }: ButtonProps,
    ref,
  ) => {
    const iconContent = loading ? (
      <Spinner
        animation='border'
        aria-hidden='true'
        as='span'
        role='status'
        size={iconOnly ? undefined : 'sm'}
      />
    ) : (
      icon
    )
    const iconMarkup = iconContent ? (
      <span className={styles.icon}>{iconContent}</span>
    ) : null
    return (
      <BsButton
        {...props}
        className={classnames(
          styles.button,
          { [styles.iconOnly]: iconOnly, [styles.iconRight]: iconRight },
          className,
        )}
        ref={ref}
      >
        {iconRight ? null : iconMarkup}
        {children ? <span>{children}</span> : null}
        {iconRight ? iconMarkup : null}
      </BsButton>
    )
  },
)

interface TitledButtonProps extends ButtonProps {
  title: string
  showTitle?: boolean
}

export const TitledButton = forwardRef(
  ({ title, showTitle, ...props }: TitledButtonProps, ref) => {
    const [showTitleState, setShowTitle] = useState(false)
    const buttonRef = useRef(null)
    useImperativeHandle(ref, () => buttonRef.current)

    return (
      <>
        <Button
          {...props}
          onMouseOver={() => {
            setShowTitle(true)
          }}
          onMouseOut={() => {
            setShowTitle(false)
          }}
          ref={buttonRef}
        />
        <Overlay
          target={buttonRef.current}
          show={showTitle || showTitleState}
          placement='right'
        >
          {(tipProps) => <Tooltip {...tipProps}>{title}</Tooltip>}
        </Overlay>
      </>
    )
  },
)
