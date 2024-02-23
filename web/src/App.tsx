
import {
  useState,
  useEffect
} from 'react'

import {
  useDisclosure,
  useMediaQuery
} from '@mantine/hooks'

import {
  AppShell,
  Box,
  NavLink,
} from '@mantine/core'

import Plausible from 'plausible-tracker'

import NewDraftView           from '@/components/drafts/new_draft'
import DraftView              from './components/drafts'
import ContractView           from '@/components/contract'
import DepositView            from './components/deposits'
import Header                 from '@/components/ui/header'
import SideBar                from '@/components/ui/drawer'
import FooterComponent        from './components/ui/footer'
import SettingsView           from './components/settings'
import SignerButton           from './components/ui/signerButton'
import MobileFooterComponent  from './components/ui/mobileFooter'

export default function AppDemo() {
  const [ navi_desk_open, { toggle : toggle_navi_desk } ] = useDisclosure(true)
  const [ navi_mobi_open, { toggle : toggle_navi_mobi } ] = useDisclosure()
  const [ side_desk_open, { toggle : toggle_side_desk } ] = useDisclosure()
  const [ side_mobi_open, { toggle : toggle_side_mobi } ] = useDisclosure()

  const isMobile = useMediaQuery('(max-width: 768px)')
  
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
  
  
  // --------------------------------------
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

      <AppShell.Navbar p="md"style={{ height: '100%' }}>
        <NavLink label="Drafts" active={view === 'drafts'}
         onClick={() => { 
          setView('drafts'); 
          if (isMobile) toggle_navi_mobi(); 
        }}
        />
        <NavLink label="Contracts" active={view === 'contract'}
           onClick={() => { 
            setView('contract'); 
            if (isMobile) toggle_navi_mobi();
          }}
        />
        <NavLink label="Deposits" active={view === 'deposits'}
         onClick={() => { 
          setView('deposits'); 
          if (isMobile) toggle_navi_mobi();
        }}
        />
        <NavLink label="Settings" active={view === 'settings'} 
         onClick={() => { 
          setView('settings'); 
          if (isMobile) toggle_navi_mobi();
        }}
        />
        <NavLink label="New Proposal" active={view === 'new'} 
           onClick={() => { 
            setView('new'); 
            if (isMobile) toggle_navi_mobi();
          }}
          component="a"
          style={{
            fontWeight: 600,
            backgroundColor: '#0068FD',
            borderRadius: '15px',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '32px', 
            marginTop: '20px',
            width: '100%', 
            textDecoration: 'none',
            maxWidth: '120px'
        }}
        />
         {isMobile && <MobileFooterComponent/>}
      </AppShell.Navbar>

      <AppShell.Aside>
        <SideBar />
      </AppShell.Aside>

      <AppShell.Main style={{ width: '100%', maxWidth: '100%' }}>
        { view === 'drafts'   && <DraftView /> }
        { view === 'contract' && <ContractView /> }
        { view === 'deposits' && <DepositView  /> }
        { view === 'settings' && <SettingsView  /> }
        {view === 'new' && <NewDraftView />}
        <SignerButton
         side_opened = {isMobile ? side_mobi_open : side_desk_open}
         side_toggle_desk = {toggle_side_desk}
         side_toggle_mobi = {toggle_side_mobi}
       
        />
      </AppShell.Main>

      <AppShell.Footer>
        <FooterComponent/>
      </AppShell.Footer>

    </AppShell>
  )
}
