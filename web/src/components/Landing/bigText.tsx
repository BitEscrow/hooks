import React 				from 'react'
import { Paper, Text }  	from '@mantine/core'
import { useMediaQuery }	from '@mantine/hooks'
import { CSSProperties } 	from 'react'


export default function BigText() {
	const isMobile = useMediaQuery('(max-width: 767px)')
    
	const containerStyle : CSSProperties = {
		padding   : '20px',
		maxWidth  : !isMobile ? '1074px' : '100%',
		width     : '100%',
		margin    : '100px 0 50px 0',
		boxSizing : 'border-box',
	}
  
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<Paper style={containerStyle}>
				<Text size={isMobile ? '30px' : '50px'} fw={800} align="left">
            Our API is your canvas for next-gen marketplaces, transformative apps, and revolutionary wallets - For the first time ever,{' '}
					<span style={{ color: '#0068FE' }}>
            you can completely reverse and dispute Bitcoin transactions
					</span>
					{' '}to near eliminate scams and fraud.
				</Text>
			</Paper>
		</div>
	)
}
  