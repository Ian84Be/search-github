import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { breakpoints } from '../../styles/_breakpoints'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (max-width: ${breakpoints.medium}) {
    padding-top: 0;
  }
`
const Header = styled.header`
  border-bottom: 1px solid var(--border-muted);
  display: flex;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: ${breakpoints.medium}) {
    padding-left: 0;
  }
`
const Body = styled.main`
  display: flex;
  flex-direction: row;
  max-width: var(--content-max);
  width: 100%;
  @media (max-width: ${breakpoints.medium}) {
    align-items: center;
    flex-direction: column;
  }
`
const Column = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`
const SortFilterContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  width: 100%;
  @media (min-width: ${breakpoints.medium}) {
    display: none;
  }
`
const Selector = styled.select`
  background-color: var(--bg);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  display: inline-block;
  height: 32px;
  max-width: 100%;
  padding: 5px 12px;
  width: 75%;

  &:hover {
    background: var(--border);
    border-color: var(--text-muted);
    cursor: pointer;
  }
`

const SortSelector = styled.select`
  background-color: var(--bg);
  background-position: right 8px center;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-muted);
  font-size: 16px;
  height: 32px;
  padding: 5px 12px;

  &:hover {
    background: var(--border);
    border-color: var(--text-muted);
    cursor: pointer;
  }

  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`
const LanguagePanel = styled.section`
  display: flex;
  flex-direction: column;
  width: 25%;
  @media (max-width: ${breakpoints.medium}) {
    display: none;
  }
`
const LanguageBody = styled.div`
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const LanguageHeader = styled.header`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
`
const LanguageRow = styled.div`
  border-radius: 6px;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  padding: 6px 12px;
  &:hover {
    background: var(--header-bg);
    cursor: pointer;
  }
`
const ResultsPanel = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  width: 75%;
  @media (max-width: ${breakpoints.medium}) {
    width: 100%;
    padding: 0;
  }
`
const ResultRow = styled.div`
  border-bottom: 1px solid var(--border-muted);
  display: flex;
  flex-direction: row;
  padding: 20px;
  &:hover {
    cursor: pointer;
  }
`

function Results() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchResults, setSearchResults] = useState(null)
  const [languages, setLanguages] = useState(null)

  useEffect(() => {
    const countLanguages = (items) => {
      const result = {}
      items.forEach(({ language }) => {
        if (result[language]) result[language] += 1
        else result[language] = 1
      })
      return result
    }

    const queryGithub = async () => {
      const baseUrl = 'https://api.github.com/search/repositories?'
      const response = await fetch(baseUrl + searchParams.toString())
        .then((res) => res.json())
        .catch((err) => console.error(err))
      console.log({ response })
      setLanguages(countLanguages(response.items))
      setSearchResults(response)
    }
    queryGithub()
  }, [searchParams])

  const handleSort = async (e) => {
    let newQuery = {}
    for (let [key, value] of searchParams.entries()) {
      newQuery[key] = value
    }
    newQuery.sort = e.target.value
    setSearchParams(newQuery)
  }

  const handleDetails = async (full_name) => {
    navigate(`../details?full_name=${full_name}`, { replace: true })
  }

  const handleLanguageFilter = async (event) => {
    let newQuery = {}
    for (let [key, value] of searchParams.entries()) {
      newQuery[key] = value
    }
    let query = searchParams.get('q').split(' ')
    newQuery.q = `${query[0]} language:${event.target.value}`
    setSearchParams(newQuery)
  }

  if (searchResults) {
    const languageKeys = Object.keys(languages)
    return (
      <Container>
        <Body>
          <Column>
            <SortFilterContainer>
              <label htmlFor="language">Language</label>
              <Selector
                value={searchParams.get('q').split(' ')[0]}
                onChange={handleLanguageFilter}
              >
                {languageKeys &&
                  languageKeys.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
              </Selector>
            </SortFilterContainer>

            <SortFilterContainer>
              <label htmlFor="sort">Sort</label>
              <Selector value={searchParams.get('sort')} onChange={handleSort}>
                <option value={''}>Best match</option>
                <option value={'stars'}>Most stars</option>
              </Selector>
            </SortFilterContainer>
          </Column>

          <LanguagePanel>
            <LanguageBody>
              <LanguageHeader>Languages</LanguageHeader>
              {languageKeys &&
                languageKeys.map((lang) => (
                  <LanguageRow
                    key={lang}
                    onClick={() => handleLanguageFilter(lang)}
                  >
                    <div>{lang}</div>
                    <div>{languages[lang]}</div>
                  </LanguageRow>
                ))}
            </LanguageBody>
          </LanguagePanel>

          <ResultsPanel>
            <Header>
              <div>
                showing {searchResults.items.length} of{' '}
                {searchResults.total_count} repository results
              </div>
              <SortSelector
                value={searchParams.get('sort')}
                onChange={handleSort}
              >
                <option value={''}>Best match</option>
                <option value={'stars'}>Most stars</option>
              </SortSelector>
            </Header>
            {searchResults.items &&
              searchResults.items.map((item) => (
                <ResultRow
                  key={item.id}
                  onClick={() => handleDetails(item.full_name)}
                >
                  {item.name}
                </ResultRow>
              ))}
          </ResultsPanel>
        </Body>
      </Container>
    )
  } else return <></>
}

export default Results
