import { useEffect, useState } from "react"
import { Character } from "../types/App.types"
import { getFilteredCharacters } from "../services/characters"

export const useFetchCharacters = (currentPage: number) => {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [search, setSearch] = useState('')

  const fetchCharacters = async (page = currentPage) => {
    setIsLoading(true)
    const response = await getFilteredCharacters(search, page)
    setIsLoading(false)
    setTotalPages(Math.ceil(response.count / 10))
    setCharacters(response.results)
  }

  useEffect(() => {
    fetchCharacters()
  }, [currentPage])

  return { characters, isLoading, totalPages, search, setSearch, fetchCharacters }
}