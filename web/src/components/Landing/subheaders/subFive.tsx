import React                 	from 'react'
import { Text, Button }      	from '@mantine/core'
import useIsMobile 		     	from '@/hooks/useIsMobile'
import { FaGithub }          	from 'react-icons/fa'
import { RiArrowRightSLine } 	from 'react-icons/ri'
import { BiGitRepoForked } 		from 'react-icons/bi'
import { CSSProperties } 		from 'react'



export default function SubheroFive() {
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
				<img src="/Images/DevLanding/source.png" alt="Descriptive Alt Text" style={{ maxWidth: '70%', height: 'auto', padding: '40px' }} />
			</div>
			<div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
				<Text align='left' size='xl' style={{ marginBottom: '30px', fontSize: isMobile ? '30px' : '50px', }} fw={700} pb='lg'>
          Open Source
				</Text>
				<Text align='left' style={{color: '#425466'}}>
			We are committed to fostering an environment of transparency, accountability, and collaboration. Our API is open source, which means we have absolutely nothing to hide. Not only is our API open source, but so is our tech stack, analytics, and more - because it is the right thing to do.
					<br/>
					<br/>
			Dive in, explore our code, and even contribute. We believe in empowering our community to help us build better solutions for everyone involved.
				</Text>
				<div style={{ display: 'flex', justifyContent: 'left', gap: '20px' }}>
					<Button
						style={{
							width           : isMobile ? '100%' : 'auto',
							margin          : isMobile ? '40px auto' : '40px 0',
							color           : '#e8e8e8',
							backgroundColor : '#0c0c0c',
							borderRadius    : '25px',
							textAlign       : 'left',
						}}
						rightIcon={<RiArrowRightSLine />}
						leftIcon={<FaGithub />}
						onClick={() => window.open('https://github.com/BitEscrow', '_blank')}
					>
    GitHub
					</Button>
					<Button
						style={{
							width           : isMobile ? '100%' : 'auto',
							margin          : isMobile ? '40px auto' : '40px 0',
							color           : '#e8e8e8',
							backgroundColor : '#0068FE',
							borderRadius    : '25px',
							textAlign       : 'left',
						}}
						rightIcon={<RiArrowRightSLine />}
						leftIcon={<BiGitRepoForked />}
						onClick={() => window.open('https://stackshare.io/companies/bitescrow', '_blank')}
					>
    Stackshare
					</Button>
				</div>

			</div>
		</div>
	)
}
