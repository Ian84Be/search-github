import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import GithubRepoIcon from '../GithubRepoIcon'
import GithubStar from '../GithubStar'
import githubLanguageColors from '../../styles/githubLanguageColors'

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`
const ResultRow = styled.div`
  border-bottom: 1px solid var(--border-muted);
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: var(--content-max);
`
const ResultHeader = styled.header`
  display: flex;
  padding-bottom: 10px;
  &:hover {
    cursor: pointer;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  svg {
    margin-right: 20px;
  }
`
const ResultBody = styled.section`
  display: flex;
  flex-direction: column;
  padding-left: 40px;
`
const TopicsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0 10px;
`
const TopicsFooter = styled.section`
  align-items: center;
  color: var(--text-muted);
  display: flex;
  flex-wrap: wrap;
  font-size: 12px;
  svg {
    margin-right: 5px;
  }
  a {
    align-items: center;
    color: var(--text-muted);
    display: flex;

    text-decoration: none;
    &:hover {
      color: var(--link);
      svg {
        fill: var(--link);
      }
    }
  }
`
const TopicButton = styled.a`
  background: var(--color-accent-subtle);
  border: 1px solid var(--color-topic-tag-border);
  border-radius: 2em;
  color: var(--link);
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  line-height: 22px;
  margin: 2px;
  padding-right: 10px;
  padding-left: 10px;
  text-decoration: none;
  &:hover {
    background-color: var(--color-accent-emphasis);
    color: var(--color-fg-on-emphasis);
    cursor: pointer;
  }
`
const RepoLanguageColor = styled.span`
  background: ${(props) => props.langColor};
  border: 1px solid var(--text-muted);
  border-radius: 50%;
  margin-left: 20px;
  margin-right: 5px;
  width: 12px;
  height: 12px;
`

const Details = () => {
  let [searchParams, setSearchParams] = useSearchParams()
  const [searchResults, setSearchResults] = useState(null)
  useEffect(() => {
    const queryGithub = async () => {
      const full_name = searchParams.get('full_name')
      const baseUrl = 'https://api.github.com/repos/'
      const response = await fetch(baseUrl + full_name)
        .then((res) => res.json())
        .catch((err) => console.error(err))
      // console.log({ response })
      setSearchResults(response)
    }
    queryGithub()
  }, [searchParams])
  if (searchResults) {
    const { full_name, description, topics, stargazers_count, language } =
      searchResults
    return (
      <Container>
        <ResultRow>
          <ResultHeader>
            <GithubRepoIcon />
            <a href={`https://github.com/${full_name}`}>{full_name}</a>
          </ResultHeader>
          <ResultBody>
            {description}
            <TopicsContainer>
              {topics &&
                topics.map((topic) => (
                  <TopicButton
                    key={topic}
                    href={`https://github.com/topics/${topic}`}
                  >
                    {topic}
                  </TopicButton>
                ))}
            </TopicsContainer>
            <TopicsFooter>
              <a href={`https:/github.com/${full_name}/stargazers`}>
                <GithubStar />
                {stargazers_count}
              </a>
              <RepoLanguageColor langColor={githubLanguageColors[language]} />
              {language}
            </TopicsFooter>
          </ResultBody>
        </ResultRow>
      </Container>
    )
  } else return <></>
}

export default Details
