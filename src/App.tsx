import { useEffect, useState } from 'react'
import './App.css'
import { getFilteredCharacters } from './services/characters'
import { Character } from './types/App.types'


function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchCharacters = async () => {
    setIsLoading(true)
    const characters = await getFilteredCharacters(search)
    setIsLoading(false)
    setCharacters(characters)
  }

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchCharacters()
    }
  }

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <div className='app-container'>
      <img src='sw-logo.png' alt='Star Wars Logo' height={150} />
      <input type='text' onChange={(e) => setSearch(e.target.value)} placeholder='Search by name...' onKeyDown={handleInputEnter} />
      <div className='card-container'>
        {isLoading && [...Array(4)].map((_, index) => (
          <div key={index} className='skeleton-card'>
          </div>
        ))
        }
        {!isLoading && characters.length > 0 && characters.map((character, index) => (
          <div key={index} className='card'>
            <div className='card-header'>
              <strong>
                {character.name}
              </strong>
            </div>
            <div className='card-content'>
              <p><strong>Height:</strong> {character.height} cm.</p>
              <p><strong>Weight:</strong> {character.mass} kg.</p>
              <p><strong>Birth Year:</strong> {character.birth_year}</p>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default App
