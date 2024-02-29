import React                        from 'react'
import { Grid, Col, Title, Text }   from '@mantine/core'
import { useMediaQuery }            from '@mantine/hooks'
import { CSSProperties } 			from 'react'


export default function Stats() {
	// Define breakpoints
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
	const isMobile = useMediaQuery('(max-width: 767px)')
  
	const containerStyle = {
		maxWidth        : isDesktop ? '1074px' : '100%',
		margin          : '0 auto 0 auto',
		padding         : '60px 20px 60px 20px',
		backgroundColor : '#FAFBFC',
		borderRadius    : isMobile ? '0' : '25px',
	}
  
	const alignment = isMobile ? 'left' : 'center'
  
	const colStyle : CSSProperties = {
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : isMobile ? 'flex-start' : 'center',
		textAlign     : isMobile ? 'left' : 'center',
	}
  
	const renderCol = (title : string, subheader : string) => (
		<Col span={isDesktop ? 3 : isTablet ? 6 : 12} style={colStyle}>
			<Title style={{ color: '#0068FE' }} order={1}>{title}</Title>
			<Text c='dimmed' style={{ maxWidth: !isMobile ? '225px' : 'auto', color: '#425466' }}>{subheader}</Text>
		</Col>
	)
  
	return (
		<div style={containerStyle}>
			<div style={{ wordWrap: 'break-word', margin: '0 0 70px 0', }}>
				<Text 
					align={alignment} 
					size='xl' 
					style={{ margin: ' auto auto 10px auto', fontSize: isMobile ? '30px' : '50px' }} 
					fw={700}
				>
            Benchmarking Escrows Future
				</Text>
				<Text align={alignment} style={{ maxWidth: '700px', margin: 'auto', color: '#425466' }}>
            Harnessing the unparalleled power of Bitcoin, our mission is to transform escrow like never before. With a focus on rapidity and streamlined efficiency, we make the intricate feel intuitive. 
				</Text>
			</div>
			<Grid gutter="lg" style={{ padding: isMobile ? '0 0 0 20px' : '0 0 0 0'}}>
				{renderCol('#1',      'Setting the industry standard for Bitcoin Escrow.')}
				{renderCol('99.999%', 'Unwavering and reliable historical API uptime.')}
				{renderCol('~187x',   'Faster than Traditonal Escrow, at the speed of Bitcoin.')}
				{renderCol('71%',     'Savings in escrow fees, based on average comparisons.')}
			</Grid>
		</div>
	)
}
