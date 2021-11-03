import React, { useEffect, useState } from 'react'
import GlobalStyles from '../styles/GlobalStyles'
import styled from 'styled-components'
import 'normalize.css'

const Container = styled.div`
  border: 1px solid red;
  width: 100%;
  margin: 0;
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
`

function App() {
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const githubTest = async () => {
      const testURL = `https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc`
      const response = await fetch(testURL)
        .then((res) => res.json())
        .catch((err) => console.error(err))
      console.log({ response })
      setSearchResults(response)
    }
    githubTest()
  }, [])

  return (
    <Container>
      <GlobalStyles />
      <SearchLabel htmlFor="searchGithub">Search Github</SearchLabel>
      <SearchInput id="searchGithub" placeholder="search github" type="text" />
    </Container>
  )
}

export default App
