import { useEffect, useState } from "react"
import { Character, Film, World } from "../types/App.types"
import { getCharacterFilms, getCharacterPlanet } from "../services/characters"

export const useFetchCharacterInfo = (character: Character | null) => {
  const [homeWorld, setHomeWorld] = useState<World | null>(null)
  const [films, setFilms] = useState<Film[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCharacterInfo = async () => {
      setIsLoading(true)
      const planet = await getCharacterPlanet(character!)
      setHomeWorld(planet)
      const films = await getCharacterFilms(character!)
      films.sort((a, b) => a.episode_id - b.episode_id)
      setFilms(films)
      setIsLoading(false)
    }

    fetchCharacterInfo()
  }, [character])

  return { homeWorld, films, isLoading }
}