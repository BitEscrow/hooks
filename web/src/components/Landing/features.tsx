import React, { useState, useEffect }                    from 'react'
import { Text, Col, SimpleGrid, Grid}                    from '@mantine/core'
import Image                                             from 'next/image'


const FeatureComponent : React.FC = () => {

	const [ isMobile, setIsMobile ] = useState(() => typeof window !== 'undefined' && window.innerWidth <= 991)

	useEffect(() => {
		if (typeof window === 'undefined') return

		const handleResize = () => {
			setIsMobile(window.innerWidth <= 991)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
  
	const features = [
		{
			imageSrc    : '/Images/anon.png',
			title       : 'Privacy First - Always',
			description : 'Your transaction remains a whisper. Full encryption, no data held, and zero footprint on chain.',
		},
		{
			imageSrc    : '/Images/gear.png',
			title       : 'Super Simple Schema',
			description : 'Easy and human readable API schema with clear steps. Escrow for your app, uncomplicated.',
		},
		{
			imageSrc    : '/Images/blockchain.png',
			title       : 'Non-Custodial',
			description : 'Your keys, your contract. No third party risks. Leveraging pre-signed BTC transactions only.',
		},
		{
			imageSrc    : '/Images/atomic.png',
			title       : 'Beyond the Cutting Edge',
			description : 'Elevating Bitcoin\'s horizon with custom next-generation libraires, μSig, and Taproot.',
		},
		{
			imageSrc    : '/Images/contract.png',
			title       : 'Smart Contract Automation',
			description : 'Automate escrow releases based on pre-set conditions using our advanced smart contracts.',
		},
		{
			imageSrc    : '/Images/tools.png',
			title       : 'Full SDK Suite',
			description : 'Comprehensive tools, libraries, and more for seamless integration for your project.',
		},
	]

	const items = features.map((feature) => (
		<div 
			key={feature.title} 
			style={{ 
				display       : 'flex', 
				flexDirection : isMobile ? 'row' : 'column', 
				alignItems    : 'flex-start', 
				margin        : isMobile ? '50px 0 0 0' : undefined,
			}}
		>
			<div style={{ 
				backgroundColor : '#0068FE', 
				borderRadius    : '15px', 
				padding         : '10px', 
				display         : 'inline-flex', 
				marginRight     : isMobile ? '10px' : '0' 
			}}>
				<Image 
					src={feature.imageSrc} 
					alt={feature.title} 
					width={45} 
					height={45}
				/>
			</div>


			<div style={{ textAlign: 'left', flex: 1, marginTop: 'auto', marginBottom: 'auto'}}>
				<Text fz='lg' mt={isMobile ? '0' : 'sm'} fw={800}>
					{feature.title}
				</Text>
				<Text 
					c='dimmed' 
					fz='sm' 
					style={{ 
						width   : !isMobile ? '100%' : 'auto', 
						display : !isMobile ? 'block' : undefined,
						color   : '#425466',
						
					}}>
					{feature.description}
				</Text>

			</div>
		</div>
	))
  
	return (
		<div style={{ 
			display        : 'flex', 
			justifyContent : 'center', 
			alignItems     : 'center', 
			maxWidth       : !isMobile ? '1200px' : undefined,
			marginLeft     : !isMobile ? 'auto' : undefined, 
			marginRight    : !isMobile ? 'auto' : undefined, 
		}}>
			<div style={{ width: '100%', textAlign: 'left' }}>
				<Grid 
					style={{ 
						paddingTop : '20px', 
						margin     : !isMobile ? '0 auto 0 auto' : '0 0 90px 0' 
					}}
				>
					<Col span={12}>
						<SimpleGrid 
							cols={3} 
							spacing={30} 
							breakpoints={[ { maxWidth: 'md', cols: 1 } ]}
							style={{ textAlign: isMobile ? 'left' : 'left' }}
						>
							{items}
						</SimpleGrid>
					</Col>
				</Grid>
			</div>
		</div>
	)
  
  

}

export default FeatureComponent

// Ensuring your transactions are safe with our top-tier industry leading encryption standards.