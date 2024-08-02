import React from "react"

export type Character = {
  name: string
  height: string
  mass: string
  hair_color: string
  homeworld: string
  birth_year: string
  gender: string
  films: string[]
  starships: string[]
  eye_color: string
}

export type World = {
  name: string
}

export type Film = {
  title: string
  episode_id: number
}

export type Ship = {
  name: string
  model: string
}

export type GenderObject = {
  [key: string]: {
    color: string
    icon: string
  }
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode
}