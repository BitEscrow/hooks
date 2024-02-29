import React        from 'react'
import { Prism }    from '@mantine/prism'

interface CodeSectionProps {
	codeString : string;
  }

function CodeSection({ codeString } : CodeSectionProps) {
	const [ isMobile, setIsMobile ] = React.useState(() => typeof window !== 'undefined' && window.innerWidth <= 850)

	React.useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 850)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const codeContainerStyle = {
		padding   : isMobile ? '0px' : '10px',
		width     : '100%',
		overflowx : 'auto',
		maxWidth  : isMobile ? '100vw' : '1070px',
	}

	return (
		<div style={codeContainerStyle}>
			<Prism language='tsx'>{codeString}</Prism>
		</div>
	)
}

export default CodeSection
