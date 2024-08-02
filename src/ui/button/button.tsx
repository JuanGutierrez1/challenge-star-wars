import React from "react"
import style from './button.module.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  active?: boolean
  onClick: () => void
}

export const Button = (props: ButtonProps) => {
  return (
    <button  {...props} className={`${style['button']} ${props.active && style['active']}`}>{props.children}</button>
  )
}