import React 					from 'react'
import {
	createStyles,
	Container,
	Text,
	Button,
	Group,
	rem
}                             	from '@mantine/core'
import { RiArrowRightSLine }  	from 'react-icons/ri'
import { FaDiscord }          	from 'react-icons/fa'
import FeatureComponent       	from './features'

import useIsMobile 				from '@/hooks/useIsMobile'
import { usePlausible } 		from 'next-plausible'



const useStyles = createStyles((theme) => ({
	wrapper: {
		position  : 'relative',
		boxSizing : 'border-box',
	},

	inner: {
		position                     : 'relative',
		[theme.fn.smallerThan('sm')] : {
			paddingBottom : rem(60),
			paddingTop    : rem(10),
		},
	},

	title: {
		fontSize   : rem(62),
		fontWeight : 900,
		lineHeight : 1.1,
		margin     : 0,
		padding    : 0,
		color      : theme.colorScheme === 'dark' ? theme.white : theme.black,

		[theme.fn.smallerThan('sm')]: {
			fontSize   : rem(42),
			lineHeight : 1.2,
		},
	},

	description: {
		marginTop : theme.spacing.xl,
		fontSize  : rem(24),
		color     : '#425466',

		[theme.fn.smallerThan('sm')]: {
			fontSize: rem(18),
		},
	},

	control: {
		height       : rem(54),
		paddingLeft  : rem(38),
		paddingRight : rem(38),

		[theme.fn.smallerThan('sm')]: {
			height       : rem(54),
			paddingLeft  : rem(18),
			paddingRight : rem(18),
			flex         : 1,
		},
	},
}))

export function Hero() {
	const { classes } = useStyles()
	const isMobile = useIsMobile()
	const plausible = usePlausible()


	const commonButtonStyle = {
		borderRadius    : '50px',
		width           : isMobile ? '45%' : '20%',
		paddingLeft     : rem(18),
		paddingRight    : rem(18),
		marginBottom    : isMobile ? rem(10) : 0,
		backgroundColor : '#0068FE',
	}

	return (
		<div className={classes.wrapper} style={{marginTop: isMobile? '0' : '70px'}}>
			<Container size={1074} className={classes.inner}>
				<h1 className={classes.title}>
					{' '}
					<Text component='span' inherit color='#0068FE'>
          Unmatched Security Meets Simplicity.
					</Text>{' '}
          Introducing The BitEscrow API.
          For Pioneers Only.
				</h1>

				<Text className={classes.description} color='dimmed'>
        Experience the epitome of developer excellence with our cutting-edge API, a true marvel that empowers you to imagine more, code less, and build the extraordinary. 
				</Text>

				{!isMobile && <FeatureComponent />}
        
				<Group
					mt={60}
					position={isMobile ? 'center' : 'left'}
					style={{ flexDirection: isMobile ? 'row' : 'row' }}
				>
					<Button
						radius='xl'
						color='#0068FE'
						rightIcon={<RiArrowRightSLine />}
						style={commonButtonStyle}
						onClick={() => { window.open('https://docs.BitEscrow.app', '_blank') && plausible('ReadDocs')}}
					>
            Read the Docs
					</Button>
					<Button
						radius='xl'
						color='black'
						leftIcon={<FaDiscord />} 
						rightIcon={<RiArrowRightSLine />}
						style={{...commonButtonStyle, backgroundColor: '#f2f2f2', color: '#1A1B1E'}}
						onClick={() => window.open('https://github.com/BitEscrow', '_blank')}
					>
            Discord
					</Button>
				</Group>
			</Container>
		</div>
	)
}
