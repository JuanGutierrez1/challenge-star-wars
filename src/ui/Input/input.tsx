import { InputProps } from "../../types/App.types"
import './input.css'


export const Input = (props: InputProps) => {
  const { onSearch, ...restProps } = props;
  return (
    <div className="input-container">
      <input {...restProps} />
      <i onClick={onSearch} style={{ cursor: 'pointer' }} className="fa-solid fa-magnifying-glass fa-lg"></i>
    </div>
  )
}
