import { useNavigate } from 'react-router-dom'

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

import Header                 from '@/components/ui/header'
import FooterComponent        from '@/components/ui/footer'
import Router                 from '@/router'
import SignerButton           from '@/components/ui/signerButton'
import MobileFooterComponent  from '@/components/ui/mobileFooter'

export default function AppDemo() {
  const [ navi_desk_open, { toggle : toggle_navi_desk } ] = useDisclosure(true)
  const [ navi_mobi_open, { toggle : toggle_navi_mobi } ] = useDisclosure()
  const [ side_desk_open, { toggle : toggle_side_desk } ] = useDisclosure()
  const [ side_mobi_open, { toggle : toggle_side_mobi } ] = useDisclosure()

  const isMobile = useMediaQuery('(max-width: 768px)')
  
  const [ view, setView ] = useState('')

  const navigate  = useNavigate()

  const goto_page = (view : string) => {
    if (navi_desk_open) toggle_navi_desk()
    if (navi_mobi_open) toggle_navi_mobi()
    setView(view)
    navigate(`/${view}`)
  }
  
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
    })

    trackPageview()
  }, [])
  
  
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
            set_view    = { setView }
          />
        </Box>
        <Box hiddenFrom="sm">
          <Header
            navi_opened = { navi_mobi_open   }
            navi_toggle = { toggle_navi_mobi }
            side_opened = { side_mobi_open   }
            side_toggle = { toggle_side_mobi }
            set_view    = { setView }
          />

        </Box>
      </AppShell.Header>

      <AppShell.Navbar p="md"style={{ height: '100%' }}>
        <NavLink w={'100%'} style={{ borderRadius: '25px'}} label="Contracts" active={view === 'contracts'}
          onClick={() => goto_page('contracts')}
        />
        <NavLink w={'100%'} style={{ borderRadius: '25px'}} label="Deposits" active={view === 'deposits'}
          onClick={() => goto_page('deposits')}
        />
        <NavLink w={'100%'} style={{ borderRadius: '25px'}} label="Drafts" active={view === 'drafts'}
          onClick={() => goto_page('drafts') }
        />
        <NavLink w={'100%'} style={{ borderRadius: '25px'}} label="Settings" active={view === 'settings'} 
          onClick={() => goto_page('settings')}
        />
        <NavLink label="New Draft" active={view === 'drafts/new'} 
          onClick={() => goto_page('drafts/new')}
          component="a"
          style={{
            fontWeight: 600,
            backgroundColor: '#0068FD',
            borderRadius: '25px',
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

      <AppShell.Main style={{ width: '100%', maxWidth: '100%' }}>
        <Router />
      </AppShell.Main>

      <AppShell.Footer>
        <FooterComponent/>
      </AppShell.Footer>

      <SignerButton />

    </AppShell>
  )
}
