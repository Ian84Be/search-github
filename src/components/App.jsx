import React, { useEffect, useState } from 'react'
import GlobalStyles from '../styles/GlobalStyles'
import styled from 'styled-components'
import Results from './results'
import Details from './results/Details'
import { useNavigate, Routes, Route } from 'react-router-dom'
import GithubLogo from './GithubLogo'

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
const Form = styled.form`
  align-items: center;
  display: flex;
`
const SearchInput = styled.input`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  margin-left: 20px;
  padding: 5px 12px;
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
        <Form onSubmit={submitForm}>
          <GithubLogo />
          <SearchInput
            id="search"
            name="search"
            placeholder="search"
            type="text"
            value={searchInput}
            onChange={handleChange}
          />
        </Form>
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
