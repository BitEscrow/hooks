
import { useState, useEffect } from 'react'

import { useDisclosure } from '@mantine/hooks'

import { AppShell, Box, NavLink, Text } from '@mantine/core'

import Plausible from 'plausible-tracker'

import ProposalView from '@/components/proposal'
import ContractView from '@/components/contract'
import Header       from '@/components/header'
import SideBar      from '@/components/drawer'

export default function AppDemo() {
  const [ navi_desk_open, { toggle : toggle_navi_desk } ] = useDisclosure(true)
  const [ navi_mobi_open, { toggle : toggle_navi_mobi } ] = useDisclosure()
  const [ side_desk_open, { toggle : toggle_side_desk } ] = useDisclosure()
  const [ side_mobi_open, { toggle : toggle_side_mobi } ] = useDisclosure()
  
  const [ view, setView ] = useState('proposal')
  
  // --------------------------------------
  // https://plausible.io/mvp.bitescrow.app
  
  useEffect(() => {
    const { trackPageview } = Plausible({
      domain: 'mvp.bitescrow.app',
      trackLocalhost: true
    });

    trackPageview();
  }, []); 
  // --------------------------------------

  return (
    <AppShell
      header={{ height: 60 }}
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
        <NavLink label="proposal" active={ view === 'proposal' } onClick={ () => setView('proposal') }/>
        <NavLink label="contract" active={ view === 'contract' }onClick={ () => setView('contract') }/>
        <NavLink label="deposits" active={ view === 'deposits' }onClick={ () => setView('deposits') }/>
      </AppShell.Navbar>

      <AppShell.Aside>
        <SideBar />
      </AppShell.Aside>

      <AppShell.Main style={{ width: '100%', maxWidth: '100%' }}>
        { view === 'proposal' && <ProposalView /> }
        { view === 'contract' && <ContractView /> }
        { view === 'deposits' && <p>Deposit demo goes here.</p> }
      </AppShell.Main>

      {/* <AppShell.Footer>
        <Text h={100}>Footer goes here.</Text>
      </AppShell.Footer> */}

    </AppShell>
  )
}