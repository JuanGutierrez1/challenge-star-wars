import React from "react"
import style from './button.module.css'

interface ButtonProps {
  children: React.ReactNode
  active?: boolean
  onClick: () => void
  disabled?: boolean
}

export const Button = (props: ButtonProps) => {
  return (
    <button onClick={props.onClick} disabled={props.disabled} className={`${style['button']} ${props.active ? style['active'] : ''}`}>{props.children}</button>
  )
}