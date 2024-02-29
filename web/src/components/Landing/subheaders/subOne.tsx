import React 					from 'react'
import { Text, Button } 		from '@mantine/core'
import useIsMobile            	from '@/hooks/useIsMobile'
import { RiArrowRightSLine }  	from 'react-icons/ri'
import { CSSProperties } 		from 'react'


export default function SubheroOne() {
	const isMobile = useIsMobile()
	const style : CSSProperties = {
		display        : 'flex',
		flexDirection  : isMobile ? 'column' : 'row',
		alignItems     : 'center',
		justifyContent : 'center',
		maxWidth       : '1074px',
		margin         : !isMobile ? '100px auto 150px auto' : '50px auto 50px auto',
		height         : 'auto',
		paddingTop     : isMobile ? '30px' : '80px',
		paddingBottom  : '30px',
		overflow       : 'hidden'
		
	}

	return (
		<div style={style}>
			<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img src="/Images/DevLanding/puzzle.png" alt="Descriptive Alt Text" style={{ maxWidth: '70%', height: 'auto'}} />
			</div>
			<div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
				<Text align='left' size='xl' style={{ marginBottom: '30px', fontSize: isMobile ? '30px' : '50px' }} fw={700} pb='lg'>
          Integrations Beyond Imagination
				</Text>
				<Text align='left'  style={{color: '#425466'}}>
        Unlock unparalleled connectivity with our versatile webhooks, designed for seamless synergy with applications like Zapier. Anticipate a future where our expansive app marketplace brings every tool you need, right at your fingertips. Integration has never felt so limitless.
				</Text>
				<Button
					style={{
						width           : isMobile ? '100%' : 'auto',
						margin          : isMobile ? '40px auto' : '40px 0',
						color           : '#e8e8e8',
						backgroundColor : '#0068FE',
						borderRadius    : '25px',
						display         : 'block',
						textAlign       : 'left'
					}}
					rightIcon={<RiArrowRightSLine />}
					onClick={() => window.open('/soon', '_blank')}
				>
          Learn More
				</Button>
			</div>
		</div>
	)
}

