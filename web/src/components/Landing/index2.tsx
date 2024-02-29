import React from 'react'
import { Hero } from './hero'
import CodeDemo           from './codeSection'
import SubheroOne         from './subheaders/subOne'
import SubheroTwo         from './subheaders/subTwo'
import SubheroThree       from './subheaders/subThree'
import SubheroFour        from './subheaders/subFour'
import FeatureComponent   from './features'
import Stats              from './stats'
import BigText            from './bigText'
import useIsMobile        from '@/hooks/useIsMobile'
import SubheroFive 		    from './subheaders/subFive'
import CTA 				        from '../landing/cta'

const DevLanding = () => {

	const isMobile = useIsMobile()

	return (
		<>
			<Hero />
			{isMobile && <FeatureComponent/>}
			{!isMobile && <CodeDemo />}
			<Stats        		/>
			<BigText      		/>
			<SubheroFour  		/>
			<SubheroOne   		/>
			<SubheroTwo   		/>
			<SubheroThree 		/>
			<SubheroFive  		/>
			<CTA          		/>
		</>
	)
}

export default DevLanding
