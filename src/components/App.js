import React, { useEffect } from "react"
import GlobalStyles from "../styles/GlobalStyles"
import styled from 'styled-components'

const SearchLabel = styled.label`
	font-size: 2rem;
`

const SearchInput = styled.input`
	border-radius: 6px;
	padding: 5px 12px;
	border: 1px solid var(--border);
	background: var(--bg);
	color: var(--text);
`

function App() {
	useEffect(()=> {
		const githubTest = async () => {
			const testURL = `https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc`
			const response = await fetch(testURL).then(res=>res.json()).catch(err=>console.error(err))
			console.log({response})
		}
		githubTest()
	},[])

  return (
    <div className="App">
		<GlobalStyles/>
			<SearchLabel htmlFor="searchGithub">
			Search Github
			</SearchLabel>
			<SearchInput id="searchGithub" placeholder="search github" type="text"/>
    </div>
  );
}

export default App;
