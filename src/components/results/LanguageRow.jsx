import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSearchParams } from 'react-router-dom'

const LanguageRow = ({ count, lang }) => {
  let [searchParams, setSearchParams] = useSearchParams()
  const handleLanguageFilter = async (lang) => {
    let newQuery = {}
    for (let [key, value] of searchParams.entries()) {
      newQuery[key] = value
    }
    console.log('newQuery', newQuery)
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
export default LanguageRow
