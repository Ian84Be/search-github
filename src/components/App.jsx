import React, { useState } from 'react'
import GlobalStyles from '../styles/GlobalStyles'
import styled from 'styled-components'
import Results from './results'
import Details from './results/Details'
import { useNavigate, Routes, Route } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.header`
  background: var(--header-bg);
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Body = styled.main`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const SearchLabel = styled.label`
  font-size: 2rem;
`
const SearchInput = styled.input`
  border-radius: 6px;
  padding: 5px 12px;
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  width: 50%;
`

function App() {
  const navigate = useNavigate()
  const [searchInput, setSeachInput] = useState('')

  const handleChange = (event) => {
    setSeachInput(event.target.value)
  }

  const submitForm = async (event) => {
    event.preventDefault()
    navigate(`../search?q=${searchInput}`, { replace: true })
  }

  return (
    <Container>
      <Header>
        <GlobalStyles />
        <SearchLabel htmlFor="search">Search Github</SearchLabel>
        <form onSubmit={submitForm}>
          <SearchInput
            id="search"
            name="search"
            placeholder="search"
            type="text"
            value={searchInput}
            onChange={handleChange}
          />
        </form>
      </Header>

      <Body>
        <Routes>
          <Route path="/search" element={<Results />} />
          <Route path="/details" element={<Details />} />
        </Routes>
      </Body>
    </Container>
  )
}

export default App
