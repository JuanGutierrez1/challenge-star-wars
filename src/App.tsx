import { useState } from 'react'
import { Character } from './types/App.types'
import { Input } from './ui/Input/input'
import Modal from 'react-responsive-modal'
import { CharacterInfo } from './components/CharacterInfo/CharacterInfo'
import { Card } from './ui/card/card'
import style from './App.module.css'
import 'react-responsive-modal/styles.css';
import { Button } from './ui/button/button'
import { Pagination } from './ui/pagination/pagination'
import { useFetchCharacters } from './hooks/useFetchCharacters'


function App() {
  const [currentPage, setCurrentPage] = useState(1)
  const { characters, isLoading, totalPages, setSearch, fetchCharacters } = useFetchCharacters(currentPage)
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [open, setOpen] = useState(false)

  const handleSearch = () => {
    setCurrentPage(1)
    fetchCharacters(1)
  }

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleClick = (character: Character) => {
    setSelectedCharacter(character)
    setOpen(true)
  }

  return (
    <div className={style['app-container']}>
      <img src='sw-logo.png' alt='Star Wars Logo' height={150} />
      <Input
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search by name...'
        onSearch={handleSearch}
        onKeyDown={handleInputEnter}
        icon={<i className="fa-solid fa-magnifying-glass"></i>}
      />
      <div style={{ display: 'flex', gap: '1.2rem', maxWidth: '1280px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {isLoading && [...Array(4)].map((_, index) => (
          <Card key={index} isLoading={true} />
        ))}
        {!isLoading && characters.length > 0 && characters.map((character, index) => (
          <Card key={index} character={character} handleClick={handleClick} />
        ))}
        {!isLoading && characters.length === 0 && (
          <div style={{ color: '#f8ebe3', fontSize: '1.5rem' }}>
            No characters found
          </div>
        )}
      </div>
      {!isLoading && (
        <div>
          <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>{"<"}</Button>
          <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
          <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</Button>
        </div>
      )
      }
      <Modal
        open={open}
        center
        onClose={() => setOpen(false)}
        closeIcon={<i style={{ color: '#f8ebe3', margin: '1rem 0.5rem' }} className="fa-solid fa-x fa-lg"></i>}
        styles={{
          modal: {
            backgroundColor: '#2a4057',
            minWidth: '50%',
            padding: '2.5rem',
            borderRadius: '15px'
          }
        }}
      >
        <CharacterInfo character={selectedCharacter} />
      </Modal>
    </div>
  )
}

export default App
