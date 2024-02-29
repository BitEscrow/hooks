import React 							from 'react'
import { Col, Grid, Text, Button }    	from '@mantine/core'
import CodeSection                    	from './code'

import { RiArrowRightSLine }          	from 'react-icons/ri'
import { HiOutlineDocumentText }      	from 'react-icons/hi'

import useIsMobile                    	from '@/hooks/useIsMobile'	
import { usePlausible } 				from 'next-plausible'


export default function CodeDemo() {

	const isMobile = useIsMobile()
	const plausible = usePlausible()

	const codeString = `
// Import the EscrowContract class.
import { EscrowContract } from '@BitEscrow/escrow-api'
// We'll use this time value later.
const day = 60 * 60 * 24
// Create a draft contract by passing in a signer and template.
const contract = await EscrowContract.create(signer, {
  title : 'Example Escrow Contract',  // Specify a title for your contract.
  value : 100_000,                    // Total value of the contract (before agent and miner fees).
  alias : 'seller',                   // You can use a short alias for your pubkey.
  nonce : signer.generate(64),        // Generate a random nonce for this draft session.
  terms : {
    // Seller is charging a non-refundable fee.
    fees  : [[ 10_000, 'bc1pselleraddress' ]],
    // Seller is receiving this payment on contract close.
    paths : [
      [ 'payout', 90_000, 'bc1pselleraddress' ]
    ]
    // Seller wants the contract to close after 1 week.
    schedule  : { duration: day * 7, onclose: 'payout' },
  }
})
`
  
	const alignment = isMobile ? 'left' : 'center'


	return (
		<div style={{ paddingTop: isMobile ? '30px' : '90px', paddingBottom: isMobile ? '30px' : '30px', maxWidth: '1074px', margin: '70px auto 30px auto', display: 'flex', flexDirection: 'column', alignItems: 'center',  overflow: 'hidden' }}>
			<Grid gutter='md' style={{ flexDirection: isMobile ? 'column' : 'row' }}>
				<Col span={12} style={{ display: 'flex', justifyContent: 'center', }}>
					<div style={{ padding: '10px', wordWrap: 'break-word' }}>
						<Text 
							align={alignment} 
							size='xl' 
							style={{ marginBottom: '10px', fontSize: isMobile ? '30px' : '50px' }} 
							fw={700}
						>
            Limitless Potential. Minimal Effort.
						</Text>
						<Text align={alignment} style={{color: '#425466'}}>
            Simplifying escrow&apos;s evolution. Our API, robust and user-focused, drives both new and seasoned developers to craft and excel effortlessly. 
						</Text>
					</div>
				</Col>
				<Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
					<CodeSection codeString={codeString} />
				</Col>
				<Button
					style={{
						width           : isMobile ? '100%' : 'auto',
						margin          : '40px auto',
						color           : 'white',
						backgroundColor : '#0068FE',
						borderRadius    : '25px',
						display         : 'block',
						textAlign       : 'center'
					}}
					rightIcon={<RiArrowRightSLine />}
					onClick={() => { window.open('https://docs.BitEscrow.app', '_blank') && plausible('ReadDocs')}}
					leftIcon={<HiOutlineDocumentText />}
				>
        Read the Docs
				</Button>
			</Grid>
		</div>
	)
}