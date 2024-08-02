import { Character } from "../../types/App.types"
import style from './card.module.css'

interface CardProps {
  character?: Character
  isLoading?: boolean
  handleClick?: (character: Character) => void
}

export const Card = ({ character, isLoading = false, handleClick }: CardProps) => {
  return (
    <>
      {isLoading && (
        <div className={style['skeleton-card']} />
      )}
      {!isLoading && (
        <div className={style['flip-container']} onClick={() => handleClick!(character!)}>
          <div className={style['card']}>
            <div className={style['front-content']}>
              <strong style={{ fontSize: '1.5rem' }}>
                {character?.name}
              </strong>
            </div>
            <div className={style['back-content']}>
              <div className={style['card-details']}>
                <p><i className="fa-solid fa-ruler-vertical"></i> {character?.height} cm.</p>
                <p><i className="fa-solid fa-weight-hanging"></i> {character?.mass} kg.</p>
                <p><i className="fa-solid fa-cake-candles"></i> {character?.birth_year}</p>
              </div>
              <p>More details <i className="fa-solid fa-arrow-up-right-from-square"></i></p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}