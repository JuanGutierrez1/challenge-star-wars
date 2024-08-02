import { InputProps } from "../../types/App.types"
import './input.css'


export const Input = (props: InputProps) => {
  return (
    <div className="input-container">
      <input {...props} />
      <i onClick={props.onSearch} style={{ cursor: 'pointer' }} className="fa-solid fa-magnifying-glass fa-lg"></i>
    </div>
  )
}
