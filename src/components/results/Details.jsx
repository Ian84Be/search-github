import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

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
      console.log({ response })
      setSearchResults(response)
    }
    queryGithub()
  }, [searchParams])
  if (searchResults) {
    return (
      <div>
        {searchResults.full_name}
        {searchResults.description}
        {searchResults.stargazers_count}
        {searchResults.language}
      </div>
    )
  } else return <></>
}

export default Details
