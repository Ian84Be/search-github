import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`
const Header = styled.header`
  /* border: 1px solid red; */
  background: var(--header-bg);
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const Body = styled.main`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: row;
  padding: 20px;
`
const LanguagePanel = styled.section`
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const ResultsPanel = styled.section`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  padding: 20px;
`
const ResultRow = styled.div`
  border: 1px solid var(--border-muted);
  display: flex;
  flex-direction: row;
  padding: 20px;
`

function Results() {
  let [searchParams, setSearchParams] = useSearchParams()
  // const query = searchParams.get('q').split(' ')
  // console.log({ query })

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
      console.log('queryGithub query', searchParams.toString())
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

    console.log(newQuery)
    setSearchParams(newQuery)
  }

  if (searchResults) {
    const languageKeys = Object.keys(languages)
    return (
      <Container>
        <Header>
          <div>{searchResults.total_count} repository results</div>
          <div>
            Sort:
            <button name="sort" value={''} onClick={handleSort}>
              Best match
            </button>
            <button name="sort" value={'stars'} onClick={handleSort}>
              Stars
            </button>
          </div>
        </Header>

        <Body>
          <LanguagePanel>
            {languageKeys &&
              languageKeys.map((lang) => (
                <LanguageRow key={lang} count={languages[lang]} lang={lang} />
              ))}
          </LanguagePanel>
          <ResultsPanel>
            {searchResults.items &&
              searchResults.items.map((item) => (
                <ResultRow key={item.id}>{item.name}</ResultRow>
              ))}
          </ResultsPanel>
        </Body>
      </Container>
    )
  } else return <></>
}

const LanguageRow = ({ count, lang }) => {
  let [searchParams, setSearchParams] = useSearchParams()
  const handleLanguageFilter = async (lang) => {
    let newQuery = {}
    for (let [key, value] of searchParams.entries()) {
      newQuery[key] = value
    }
    console.log(newQuery)
    let query = searchParams.get('q').split(' ')
    console.log('searchParams query', query)
    newQuery.q = `${query[0]} language:${lang}`

    console.log(newQuery)
    setSearchParams(newQuery)
  }
  return (
    <div onClick={() => handleLanguageFilter(lang)}>
      <div>{lang}</div>
      <div>{count}</div>
    </div>
  )
}

export default Results
