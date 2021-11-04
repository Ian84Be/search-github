import React, { useEffect, useState } from 'react'
import GlobalStyles from '../styles/GlobalStyles'
import styled from 'styled-components'
import Results from './results'
import Details from './results/Details'
import { useNavigate, Routes, Route } from 'react-router-dom'
import GithubLogo from './GithubLogo'
import { breakpoints } from '../styles/_breakpoints'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const HeaderContainer = styled.header`
  background: var(--header-bg);
  display: flex;
  align-items: center;
  justify-content: center;
`
const HeaderContent = styled.header`
  background: var(--header-bg);
  display: flex;
  padding: 20px;
  max-width: var(--content-max);
  width: 100%;
  @media (max-width: ${breakpoints.medium}) {
    flex-direction: column;
    align-items: center;
    font-size: 18px;
    padding: 0;
  }
`
const HeaderLogo = styled.div`
  margin-right: 20px;
  @media (max-width: ${breakpoints.medium}) {
    margin: 20px;
    font-size: 18px;
  }
`
const Form = styled.form`
  align-items: center;
  display: flex;
  width: 50%;
  @media (max-width: ${breakpoints.medium}) {
    background: var(--bg);
    width: 100%;
    font-size: 18px;
  }
`
const SearchInput = styled.input`
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  padding: 5px 12px;
  width: 100%;
  @media (max-width: ${breakpoints.medium}) {
    margin: 20px;
    font-size: 18px;
  }
`
const Body = styled.main`
  display: flex;
  flex-direction: column;
  padding: 20px;
  /* border: 1px solid red; */
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
      <GlobalStyles />
      <HeaderContainer>
        <HeaderContent>
          <HeaderLogo>
            <GithubLogo />
          </HeaderLogo>
          <Form onSubmit={submitForm}>
            <SearchInput
              id="search"
              name="search"
              placeholder="search"
              type="text"
              value={searchInput}
              onChange={handleChange}
            />
          </Form>
        </HeaderContent>
      </HeaderContainer>

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
