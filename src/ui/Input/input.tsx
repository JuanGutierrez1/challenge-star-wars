import { InputProps } from "../../types/App.types"
import './input.css'


export const Input = (props: InputProps) => {
  return (
    <div className="input-container">
      {/* {props.icon} */}
      <input {...props} />
      <i className="fa-solid fa-magnifying-glass fa-lg"></i>
    </div>
  )
}
