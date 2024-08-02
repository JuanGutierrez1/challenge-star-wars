import { useEffect, useState } from 'react'
import { getFilteredCharacters } from './services/characters'
import { Character } from './types/App.types'
import { Input } from './ui/Input/input'
import Modal from 'react-responsive-modal'
import { CharacterInfo } from './components/CharacterInfo/CharacterInfo'
import { Card } from './ui/card/card'
import style from './App.module.css'
import 'react-responsive-modal/styles.css';
import { Button } from './ui/button/button'


function App() {
  const [characters, setCharacters] = useState<Character[]>([])
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  const fetchCharacters = async () => {
    setIsLoading(true)
    const response = await getFilteredCharacters(search, currentPage)
    setIsLoading(false)
    setTotalPages(Math.ceil(response.count / 10))
    setCharacters(response.results)
  }

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchCharacters()
    }
  }

  const handleClick = (character: Character) => {
    setSelectedCharacter(character)
    setOpen(true)
  }


  const renderPagination = () => {
    const pages = [];

    pages.push(
      <Button key={1} onClick={() => setCurrentPage(1)} active={currentPage === 1}>
        1
      </Button>
    );

    if (currentPage > 3) {
      pages.push(<span key="dots1"> ... </span>);
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(
          <Button key={i} onClick={() => setCurrentPage(i)} active={currentPage === i}>
            {i}
          </Button>
        );
      }
    }

    if (currentPage < totalPages - 2) {
      pages.push(<span key="dots2"> ... </span>);
    }

    pages.push(
      <Button
        key={totalPages}
        onClick={() => setCurrentPage(totalPages)}
        active={currentPage === totalPages}
      >
        {totalPages}
      </Button>
    );

    return pages;
  }

  useEffect(() => {
    fetchCharacters()
  }, [currentPage])

  useEffect(() => {
    fetchCharacters()
  }, [])

  return (
    <div className={style['app-container']}>
      <img src='sw-logo.png' alt='Star Wars Logo' height={150} />
      <Input
        type='text'
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search by name...'
        onSearch={fetchCharacters}
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
      <div>
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>{"<"}</Button>
        {renderPagination()}
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>{">"}</Button>
      </div>
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
