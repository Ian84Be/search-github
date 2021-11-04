import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'

const Row = styled.div`
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

const LanguageRow = ({ count, lang }) => {
  let [searchParams, setSearchParams] = useSearchParams()
  const handleLanguageFilter = async (lang) => {
    let newQuery = {}
    for (let [key, value] of searchParams.entries()) {
      newQuery[key] = value
    }
    let query = searchParams.get('q').split(' ')
    newQuery.q = `${query[0]} language:${lang}`

    console.log(newQuery)
    setSearchParams(newQuery)
  }
  return (
    <Row onClick={() => handleLanguageFilter(lang)}>
      <div>{lang}</div>
      <div>{count}</div>
    </Row>
  )
}
export default LanguageRow
