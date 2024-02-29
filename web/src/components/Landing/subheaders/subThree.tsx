import React from 'react'
import { Text, Button } 		from '@mantine/core'
import useIsMobile            	from '@/hooks/useIsMobile'
import { RiArrowRightSLine }  	from 'react-icons/ri'
import { FaDiscord } 			from 'react-icons/fa'
import { CSSProperties } 		from 'react'


export default function SubheroThree() {
	const isMobile = useIsMobile()
	const style : CSSProperties = {
		display        : 'flex',
		flexDirection  : isMobile ? 'column' : 'row',
		alignItems     : 'center',
		justifyContent : 'center',
		maxWidth       : '1074px',
		margin         : !isMobile ? '100px auto 150px auto' : '50px auto 50px auto',
		height         : 'auto',
		paddingTop     : '30px',
		paddingBottom  : '30px',
		overflow       : 'hidden'
		
	}

	return (
		<div style={style}>
			<div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<img src="/Images/DevLanding/discordCom.png" alt="Descriptive Alt Text" style={{ maxWidth: '70%', height: 'auto', padding: '0px' }} />
			</div>
			<div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
				<Text align='left' size='xl' style={{ marginBottom: '30px', fontSize: isMobile ? '30px' : '50px' }} fw={700}>
          Connect. Collaborate. Create.
				</Text>
				<Text align='left' style={{color: '#425466'}}>
          In the heart of BitEscrow lies a community where innovation thrives and code finds companionship. With the power of our API, your dream — a next-gen marketplace, a secure wallet, or a transformative app — is on the cusp of becoming a Bitcoin reality.
					<br/>
					<br/>
          Through our proactive hackathons, vibrant events, and steadfast support, we&apos;ve established a haven for the Bitcoin and Nostr developer community.
				</Text>
				<Button
					style={{
						width           : isMobile ? '100%' : 'auto',
						margin          : isMobile ? '40px auto' : '40px 0',
						color           : 'white',
						backgroundColor : '#5765F2',
						borderRadius    : '25px',
						display         : 'block',
						textAlign       : 'left'
					}}
					rightIcon={<RiArrowRightSLine />}
					leftIcon={<FaDiscord />}
					onClick={() => window.open('https://discord.gg/QxzzGd5nZg', '_blank')}
				>
          Join the Discord
				</Button>
			</div>
		</div>
	)
}

