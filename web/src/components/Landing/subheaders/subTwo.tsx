import React                 	from 'react'
import { Text, Button }      	from '@mantine/core'
import useIsMobile           	from '@/hooks/useIsMobile'
import { FaGithub }          	from 'react-icons/fa'
import { RiArrowRightSLine } 	from 'react-icons/ri'
import { CSSProperties } 	 	from 'react'


export default function SubheroTwo() {
	const isMobile = useIsMobile()
	const style : CSSProperties = {
		display         : 'flex',
		flexDirection   : isMobile ? 'column' : 'row-reverse',
		alignItems      : 'center',
		justifyContent  : 'center',
		maxWidth        : '1074px',
		margin          : !isMobile ? '100px auto 150px auto' : '50px auto 50px auto',
		height          : 'auto',
		paddingTop      : '30px',
		paddingBottom   : '30px',
		backgroundColor : '#FAFBFC',
		width           : '100%',
		borderRadius    : isMobile ? '0' : '25px',
		overflow        : 'hidden'
	}

	return (
		<div style={style}>
			<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img src="/Images/DevLanding/toolbox.png" alt="Descriptive Alt Text" style={{ maxWidth: '70%', height: 'auto', padding: '40px' }} />
			</div>
			<div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
				<Text align='left' size='xl' style={{ marginBottom: '30px', fontSize: isMobile ? '30px' : '50px' }} fw={700} pb='lg'>
          Tools for Tomorrow&apos;s Visionaries
				</Text>
				<Text align='left' style={{color: '#425466'}}>
          Streamlining your development with a comprehensive testing suite, bespoke agent actions, and fluid integrations across apps.
					<br/>
					<br/>
          Bolstered by Nostr libraries, programmable smart contract automations, fortified e2e encrypted API interactions, and the prowess of tapscript - we&apos;re just getting started.
				</Text>
				<Button
					style={{
						width           : isMobile ? '100%' : 'auto',
						margin          : isMobile ? '40px auto' : '40px 0',
						color           : '#e8e8e8',
						backgroundColor : '#0c0c0c',
						borderRadius    : '25px',
						display         : 'block',
						textAlign       : 'left'
					}}
					rightIcon={<RiArrowRightSLine />}
					leftIcon={<FaGithub />}
					onClick={() => window.open('https://github.com/BitEscrow', '_blank')}
				>
          Veiw our GitHub
				</Button>
			</div>
		</div>
	)
}
