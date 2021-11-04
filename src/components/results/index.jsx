import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router-dom'
import LanguageRow from './LanguageRow'

const Container = styled.div`
  /* border: 1px solid red; */
  align-items: center;
  display: flex;
  flex-direction: column;
`
const Header = styled.header`
  border-bottom: 1px solid var(--border-muted);
  display: flex;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
  padding: 20px;
`
const Body = styled.main`
  /* border: 1px solid white; */
  display: flex;
  flex-direction: row;
  max-width: 1012px;
  width: 100%;
`
const LanguagePanel = styled.section`
  display: flex;
  flex-direction: column;
  width: 25%;
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
const ResultsPanel = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  width: 75%;
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
const SortButton = styled.button`
  background: var(--border-muted);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text);
  font-size: 12px;
  line-height: 20px;
  padding: 3px 12px;
  &:hover {
    background: var(--border);
    border-color: var(--text-muted);
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
    if (newQuery.sort !== '') newQuery.sort = ''
    else newQuery.sort = 'stars'

    console.log(newQuery)
    setSearchParams(newQuery)
  }

  const handleDetails = async (full_name) => {
    navigate(`../details?full_name=${full_name}`, { replace: true })
  }

  if (searchResults) {
    const languageKeys = Object.keys(languages)
    return (
      <Container>
        <Body>
          <LanguagePanel>
            <LanguageBody>
              <LanguageHeader>Languages</LanguageHeader>
              {languageKeys &&
                languageKeys.map((lang) => (
                  <LanguageRow key={lang} count={languages[lang]} lang={lang} />
                ))}
            </LanguageBody>
          </LanguagePanel>
          <ResultsPanel>
            <Header>
              <div>
                showing {searchResults.items.length} of{' '}
                {searchResults.total_count} repository results
              </div>
              <SortButton onClick={handleSort}>
                Sort:{' '}
                {searchParams.get('sort') === 'stars'
                  ? 'Most stars'
                  : 'Best match'}
              </SortButton>
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
