import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
	:root {
		--bg: #0d1117;
		--header-bg: #161b22;
		--text: #c9d1d9;
		--text-muted: #8b949e;
		--link: #58a6ff;
		--border: #30363d;
		--border-muted: #21262d;
	}

	body {
		background: var(--bg);
		color: var(--text);
		a {
			color: var(--link);
		}
	}
`
export default GlobalStyles
