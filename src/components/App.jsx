import React, { useState } from 'react'
import GlobalStyles from '../styles/GlobalStyles'
import styled from 'styled-components'
import 'normalize.css'
import Results from './results'

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
  const [searchResults, setSearchResults] = useState([])
  const [formInput, setFormInput] = useState('')
  // const [queryString, setQueryString] = useState(`https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc`)

  const handleInputChange = (e) => {
    setFormInput(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await githubTest()
  }

  const githubTest = async () => {
    const testURL = `https://api.github.com/search/repositories?q=${formInput}`
    const response = await fetch(testURL)
      .then((res) => res.json())
      .catch((err) => console.error(err))
    console.log({ response })
    setSearchResults(response)
  }

  return (
    <Container>
      <Header>
        <GlobalStyles />
        <SearchLabel htmlFor="searchGithub">Search Github</SearchLabel>
        <form onSubmit={handleSubmit}>
          <SearchInput
            id="searchGithub"
            placeholder="search github"
            type="text"
            value={formInput}
            onChange={handleInputChange}
          />
        </form>
      </Header>

      <Body>{searchResults && <Results searchResults={searchResults} />}</Body>
    </Container>
  )
}

export default App
