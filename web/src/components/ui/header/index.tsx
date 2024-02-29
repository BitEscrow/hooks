import { useMediaQuery } from '@mantine/hooks'
import { useNavigate }   from 'react-router-dom'

import {
  ActionIcon,
  Button,
  Group,
  Image
} from '@mantine/core'

import {
  IconFileText,
  IconMenu2
} from '@tabler/icons-react'

interface Props {
  navi_opened : boolean
  navi_toggle : () => void
  side_opened : boolean
  side_toggle : () => void
  set_view    : (view : string) => void
}

export default function Header(props : Props) {
  // const { signer } = useSigner()
  const { navi_toggle } = props

  const navigate = useNavigate()

  // const style = {
  //   borderRadius : signer !== null ? '0px 5px 5px 0px' : '5px 5px 5px 5px'
  // }

  // const [isDarkTheme, setIsDarkTheme] = useState(true); // Assuming the default theme is dark

  // const toggleTheme = () => {
  //   setIsDarkTheme(!isDarkTheme);
  // };

  const isMobile = useMediaQuery('(max-width: 768px)')

  const go_home  = () => {
    props.set_view('')
    if (props.navi_opened) {
      navi_toggle()
    }
    navigate('/') 
  }

  return (
    <Group p={10} justify='space-between' style={{ alignItems: 'center' }}>
      <Button
        onClick     = { navi_toggle }
        aria-label  ="Toggle navbar"
        color       ='black'
        variant     ='transparent'
      >
        <IconMenu2/>
      </Button>
      <Image 
        src={'/logo.png'} 
        w={120} 
        alt="BitEscrow Logo"
        onClick={() => go_home() }
      />
      {isMobile && (
        <div style={{width: '50px'}}/>
      )}

      {!isMobile && (
      <Group gap={10}>
        <ActionIcon
          style={{borderRadius: '10px', backgroundColor: '#5765f2'}}                
          component="a"
          href="https://discord.gg/GEZJJYteyB"
          target="_blank"
          rel="noopener noreferrer"
          variant="subtle"
          size="lg"
          
          >
              <img width="21" height="21" src='/discord_logo.svg' alt="Discord" />
          </ActionIcon>
        <ActionIcon
            style={{borderRadius: '10px', backgroundColor: '#2D2D2D'}}                
            component="a"
            href="https://github.com/BitEscrow"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            
        >
            <img width="21" height="21" src='/github_logo.svg' alt="GitHub" />
        </ActionIcon>
        <ActionIcon
            style={{borderRadius: '10px', backgroundColor: '#0068FD'}}                
            component="a"
            href="https://BitEscrow.dev"
            target="_blank"
            rel="noopener noreferrer"
            variant="subtle"
            size="lg"
            
        >
            <IconFileText size={21} color='white'/>
        </ActionIcon>
        {/* <ActionIcon
          style={{
              borderRadius: '10px',
              backgroundColor: !isDarkTheme ? '#2D2D2D' : '#e8e8e8',
          }}                
          component="a"
          variant="subtle"
          size="lg"
          onClick={toggleTheme}
        >
          {isDarkTheme ? (
              <IconSun size={21} color='black' />
          ) : (
              <IconMoon size={21} color='white' />
          )}
          </ActionIcon> */}
        </Group>
      )}
    </Group>
  )
}

