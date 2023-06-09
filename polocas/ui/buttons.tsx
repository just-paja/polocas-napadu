import type { FC, ReactNode } from 'react'

import BsButton from "react-bootstrap/Button"
import Overlay from "react-bootstrap/Overlay"
import Tooltip from "react-bootstrap/Tooltip"
import classnames from "classnames"
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react"
import Spinner from "react-bootstrap/Spinner"
import styles from "./buttons.module.scss"

interface ButtonProps {
	className?: string
	children?: ReactNode | ReactNode[],
	icon?: ReactNode | ReactNode[],
	iconRight?: boolean
	iconOnly?: boolean
	loading?: boolean
}

export const Button = forwardRef(
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
				animation="border"
				aria-hidden="true"
				as="span"
				role="status"
				size={iconOnly ? undefined : "sm"}
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

export const TitledButton = forwardRef(
	({ title, showTitle, ...props }, ref) => {
		const [showTitleState, setShowTitle] = useState(false)
		const buttonRef = useRef(null)
		useImperativeHandle(ref, () => buttonRef.current)

		return (
			<>
				<Button
					{...props}
					onMouseOver={() => setShowTitle(true)}
					onMouseOut={() => setShowTitle(false)}
					ref={buttonRef}
				/>
				<Overlay
					target={buttonRef.current}
					show={showTitle || showTitleState}
					placement="right"
				>
					{(tipProps) => <Tooltip {...tipProps}>{title}</Tooltip>}
				</Overlay>
			</>
		)
	},
)
