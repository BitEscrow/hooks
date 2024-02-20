
import { useState, useEffect }    from 'react'

import { useDisclosure }          from '@mantine/hooks'

import {
  AppShell,
  Box,
  NavLink,
  Button
}                                 from '@mantine/core'

import Plausible                  from 'plausible-tracker'

import ProposalView     from '@/components/proposal'
import ContractView     from '@/components/contract'
import DepositView      from './components/deposits'
import Header           from '@/components/header'
import SideBar          from '@/components/drawer'
import FooterComponent  from './components/footer'

export default function AppDemo() {
  const [ navi_desk_open, { toggle : toggle_navi_desk } ] = useDisclosure(true)
  const [ navi_mobi_open, { toggle : toggle_navi_mobi } ] = useDisclosure()
  const [ side_desk_open, { toggle : toggle_side_desk } ] = useDisclosure()
  const [ side_mobi_open, { toggle : toggle_side_mobi } ] = useDisclosure()
  
  const [ view, setView ] = useState('drafts')
  
  // To opt out, simply delete this section
  // of code. this will not break anything.
  // See our privacy policy for more info
  // at BitEscrow.app/privacy
  // 
  // -------------Analytics----------------
  //
  // https://plausible.io/mvp.bitescrow.app
  // 
  // --------------------------------------
  
  useEffect(() => {
    const { trackPageview } = Plausible({
      domain: 'mvp.bitescrow.app',
      trackLocalhost: true
    });

    trackPageview();
  }, []); 
  // ------------End Analytics-------------
  // --------------------------------------

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 80 }}
      navbar={{
        width: 150,
        breakpoint : 'sm',
        collapsed  : { desktop : !navi_desk_open, mobile: !navi_mobi_open }
      }}
      aside={{
        width  : 300,
        breakpoint : 'sm',
        collapsed  : { desktop : !side_desk_open, mobile: !side_mobi_open } }}
      padding="md"
    >
      <AppShell.Header>
        <Box visibleFrom="sm">
          <Header
            navi_opened = { navi_desk_open   }
            navi_toggle = { toggle_navi_desk }
            side_opened = { side_desk_open   }
            side_toggle = { toggle_side_desk }
          />
        </Box>
        <Box hiddenFrom="sm">
          <Header
            navi_opened = { navi_mobi_open   }
            navi_toggle = { toggle_navi_mobi }
            side_opened = { side_mobi_open   }
            side_toggle = { toggle_side_mobi }
          />
        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <NavLink label="Drafts" active={ view === 'drafts' } onClick={ () => setView('drafts') }/>
        <NavLink label="Contracts" active={ view === 'contract' }onClick={ () => setView('contract') }/>
        <NavLink label="Deposits" active={view === 'deposits'} onClick={() => setView('deposits')} />
        <Button
          bg='#0068FD'
          radius={15}
          size="xs"
          fullWidth
          style={{ marginTop: '20px' }} // Add some space between the button and the last NavLink
          onClick={() => {/* Handle button click */}}
      >
        New Proposal
      </Button>
      </AppShell.Navbar>

      <AppShell.Aside>
        <SideBar />
      </AppShell.Aside>

      <AppShell.Main style={{ width: '100%', maxWidth: '100%' }}>
        { view === 'drafts' && <ProposalView /> }
        { view === 'contract' && <ContractView /> }
        { view === 'deposits' && <DepositView  /> }
      </AppShell.Main>

      <AppShell.Footer>
        <FooterComponent/>
      </AppShell.Footer>

    </AppShell>
  )
}
