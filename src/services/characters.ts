import { Character } from "../types/App.types"

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