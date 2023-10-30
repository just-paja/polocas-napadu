import type { ClassName } from '@polocas/core/generics'
import type { MouseEventHandler, PropsWithChildren, ReactNode } from 'react'

import classnames from 'classnames'
import React, { useRef, useState } from 'react'
import styles from './dials.module.scss'

import { useRootClose } from 'react-overlays'
import { TitledButton } from './buttons.js'
import { MoreIcon } from './icons.js'

const SpeedDialContext = React.createContext({
  open: false,
})

export const useSpeedDial = () => React.useContext(SpeedDialContext)

type SpeedDialItemProps = PropsWithChildren<{
  className?: ClassName
  icon?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  title: string
}>

export const SpeedDialItem = ({ className, ...props }: SpeedDialItemProps) => {
  const { open } = useSpeedDial()
  return (
    <TitledButton
      variant='secondary'
      {...props}
      className={classnames(styles.menuButton, className)}
      iconOnly
      showTitle={open}
    />
  )
}

type SpeedDialProps = PropsWithChildren<{
  children?: ReactNode
  className?: ClassName
  title: string
  icon: ReactNode
}>

export const SpeedDial = ({
  children,
  className,
  title,
  icon = <MoreIcon />,
}: SpeedDialProps) => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const toggle = () => setOpen(!open)
  useRootClose(ref, handleClose, { disabled: !open })

  return (
    <div className={classnames(styles.anchor, className)}>
      <div
        className={classnames('flex-column', styles.menu, {
          [styles.open]: open,
        })}
        ref={ref}
      >
        <SpeedDialContext.Provider value={{ open }}>
          {children}
        </SpeedDialContext.Provider>
      </div>
      <TitledButton
        variant='secondary'
        icon={icon}
        iconOnly
        showTitle={open}
        title={title}
        onClick={toggle}
      />
    </div>
  )
}

SpeedDial.Item = SpeedDialItem
