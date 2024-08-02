import { Character, CharactersResponse, Film, World } from "../types/App.types"

// If i receive a empty string, i will return all characters
export async function getFilteredCharacters(search: string, page: number = 1) {
  try {
    const response = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`)
    // const { results }: { results: Character[] } = await response.json()
    const characters: CharactersResponse = await response.json()
    return characters
  } catch (error) {
    console.error(error)
    return { results: [], count: 0, next: '', previous: '' }
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