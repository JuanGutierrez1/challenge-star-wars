import { Character, Film, Ship, World } from "../types/App.types"

// If i receive a empty string, i will return all characters
export async function getFilteredCharacters(search: string) {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?search=${search}`)
    const { results }: { results: Character[] } = await response.json()
    return results
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getCharacterPlanet(character: Character) {
  try {
    const response = await fetch(character.homeworld)
    const planet: World = await response.json()
    return planet
  } catch (error) {
    console.error(error)
    return null
  }
}

export async function getCharacterFilms(character: Character) {
  try {
    const films = await Promise.all(
      character.films.map(async (filmUrl) => {
        const response = await fetch(filmUrl)
        const film: Film = await response.json()
        return film
      })
    )
    return films
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function getCharacterShips(character: Character) {
  try {
    const ships = await Promise.all(
      character.starships.map(async (shipUrl) => {
        const response = await fetch(shipUrl)
        const ship: Ship = await response.json()
        return ship
      })
    )
    return ships
  } catch (error) {
    console.error(error)
    return []
  }
}