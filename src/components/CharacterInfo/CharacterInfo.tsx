import { useEffect, useState } from "react"
import { getCharacterFilms, getCharacterPlanet, getCharacterShips } from "../../services/characters"
import { Character, Film, Ship, World } from "../../types/App.types"
import { SmallCard } from "../../ui/small-card/smallCard"
import './characterInfo.css'
import { genderObject } from "../../utils/utils"



export const CharacterInfo = ({ character }: { character: Character | null }) => {
  const [homeWorld, setHomeWorld] = useState<World | null>(null)
  const [films, setFilms] = useState<Film[]>([])
  const [ships, setShips] = useState<Ship[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchCharacterInfo = async () => {
    setIsLoading(true)
    const planet = await getCharacterPlanet(character!)
    setHomeWorld(planet)
    const films = await getCharacterFilms(character!)
    films.sort((a, b) => a.episode_id - b.episode_id)
    setFilms(films)
    const ships = await getCharacterShips(character!)
    setShips(ships)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCharacterInfo()
  }, [])

  return (
    <div className="info-container">
      {isLoading && (
        <div className="skeleton-info-container">
          <div className="skeleton-modal" />
          <div className="skeleton-modal" />
          <div className="skeleton-modal" />
        </div>
      )}
      {!isLoading && character && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
            <div className="character-info-tittle">
              <p>
                {character?.name} <i style={{ color: genderObject[character?.gender].color }} className={`${genderObject[character?.gender].icon} fa-lg`} />
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <SmallCard header="Height" content={`${character?.height} cm.`} />
              <SmallCard header="Weight" content={`${character?.mass} kg.`} />
              <SmallCard header="Birth Year" content={character?.birth_year} />
              <SmallCard header="Hair Color" content={character?.hair_color} />
              <SmallCard header="Eye Color" content={character?.eye_color} />
              <SmallCard header="Home World" content={homeWorld?.name || ''} />
            </div>
          </div>
          {films.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div className="sub-title">
                <strong>Films</strong>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {films.map(film => (
                  <SmallCard content={film.title} header={`SW: Episode ${film.episode_id}`} />
                ))}
              </div>
            </div>
          )}
          {ships.length > 0 && (
            <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div className="sub-title">
                <strong>Ships</strong>
              </div>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                {ships.map(ship => (
                  <SmallCard content={ship.name} header="Name" />
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  )
}