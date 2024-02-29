import React                from 'react'
import { Text }             from '@mantine/core'
import useIsMobile          from '@/hooks/useIsMobile'
import { CSSProperties } 	from 'react'


export default function SubheroFour() {
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
				<img src="/Images/DevLanding/smartContract.png" alt="Descriptive Alt Text" style={{ maxWidth: '70%', height: 'auto', padding: '40px' }} />
			</div>
			<div style={{ flex: 1, textAlign: 'center', padding: '20px' }}>
				<Text align='left' size='xl' style={{ marginBottom: '30px', fontSize: isMobile ? '30px' : '50px', }} fw={700} pb='lg'>
          Contracts with Elevated Brilliance
				</Text>
				<Text align='left' style={{color: '#425466'}}>
          Automated, integrated, and crafted for human understanding. We&apos;re reshaping the narrative of Bitcoin smart contracts, ensuring they&apos;re not just smart, but also intuitively comprehensible.
					<br />
					<br />
          With advanced hooks in place, contracts can auto-execute precisely when specific parameters are met, amplifying efficiency and ensuring flawless operation.
				</Text>
			</div>
		</div>
	)
}
