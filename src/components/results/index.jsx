import React from 'react'
import styled from 'styled-components'

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
  flex-direction: column;
  padding: 20px;
`
const ResultRow = styled.div`
  border: 1px solid var(--border-muted);
  display: flex;
  flex-direction: row;
  padding: 20px;
`

function View({ searchResults }) {
  // console.log({ searchResults })
  const { total_count, items } = searchResults
  return (
    <Container>
      <Header>{total_count} repository results sort</Header>

      <Body>
        {items &&
          items.map((item) => <ResultRow key={item.id}>{item.name}</ResultRow>)}
      </Body>
    </Container>
  )
}

export default View
