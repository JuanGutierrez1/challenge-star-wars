import { useEffect, useState } from "react"
import { getCharacterFilms, getCharacterPlanet } from "../../services/characters"
import { Character, Film, World } from "../../types/App.types"
import style from './characterInfo.module.css'
import { capitalizeFirstLetter, filmsObject, genderObject } from "../../utils/utils"



export const CharacterInfo = ({ character }: { character: Character | null }) => {
  const [homeWorld, setHomeWorld] = useState<World | null>(null)
  const [films, setFilms] = useState<Film[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCharacterInfo = async () => {
    setIsLoading(true)
    const planet = await getCharacterPlanet(character!)
    setHomeWorld(planet)
    const films = await getCharacterFilms(character!)
    films.sort((a, b) => a.episode_id - b.episode_id)
    setFilms(films)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCharacterInfo()
  }, [])

  return (
    <div className={style['info-container']}>
      {isLoading && (
        <div className={style['skeleton-info-container']}>
          <div className={style['skeleton-modal']} />
          <div className={style['skeleton-modal']} />
        </div>
      )}
      {!isLoading && character && (
        <div className={style['data-container']}>
          <div className={style['personal-info']} >
            <img className={style['character-image']} src={`https://starwars-visualguide.com/assets/img/characters/${character?.url.split('/')[5]}.jpg`} alt={character?.name} />
            <div className={style['character-info-tittle']}>
              <p>
                {character?.name} <i style={{ color: genderObject[character?.gender].color }} className={`${genderObject[character?.gender].icon} fa-lg`} />
              </p>
            </div>
            <div className={style['badge-container']}>
              <div className={style['badge']}>
                <p><i className="fa-solid fa-ruler-vertical"></i> {character?.height} cm.</p>
              </div>
              <div className={style['badge']}>
                <p><i className="fa-solid fa-weight-hanging"></i> {character?.mass} kg.</p>
              </div>
              <div className={style['badge']}>
                <p><i className="fa-solid fa-cake-candles"></i> {character?.birth_year}</p>
              </div>
              <div className={style['badge']}>
                <p><i className="fa-solid fa-eye"></i> {capitalizeFirstLetter(character?.eye_color)}</p>
              </div>
              <div className={style['badge']}>
                <p><i className="fa-solid fa-earth-americas"></i> {homeWorld?.name}</p>
              </div>
            </div>
          </div>
          <div className={style['film-container']}>
            <div className={style['film-info']}>
              <div className={style['sub-title']}>
                <strong>Films</strong>
                <div className={style['film-list']} >
                  {films.map(film => (
                    <img key={film.episode_id} className={style['film-image']} src={`https://starwars-visualguide.com/assets/img/films/${filmsObject[film.episode_id]}.jpg`} alt={film.title} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}