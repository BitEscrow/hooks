import { useSigner } from '@/hooks/useSigner'

import {
  ActionIcon,
  Button,
  ColorSwatch,
  Group,
  Image
} from '@mantine/core'

import {
  IconKey, 
  IconMenu2
} from '@tabler/icons-react'

interface Props {
  navi_opened : boolean
  navi_toggle : () => void
  side_opened : boolean
  side_toggle : () => void
}

interface SwatchProps {
  id : string
}

export default function Header(props : Props) {
  const { signer } = useSigner()
  const { navi_toggle, side_toggle } = props

  const style = {
    borderRadius : signer !== null ? '0px 5px 5px 0px' : '5px 5px 5px 5px'
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
      <Image src={'/logo.png'} w={120} fit="auto" alt="BitEscrow Logo" />
      <Group gap={0}>
        { signer !== null && <IdSwatch id={signer.pubkey} /> }
        <ActionIcon 
          radius     = {0}
          variant    = "filled" 
          color      = "blue" 
          aria-label = "Signer" 
          onClick    = {side_toggle}
          style      = {style}
        >
          <IconKey style={{ width  : '70%', height : '70%' }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </Group>
  )
}

function IdSwatch ({ id } : SwatchProps) {
  return (
    <Group gap={0} w={70}>
      <ColorSwatch size={14} color={`#${id.slice(0, 6)}`}     radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(6, 12)}`}    radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(12, 18)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(18, 24)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(24, 30)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(30, 36)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(36, 42)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(42, 48)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(48, 54)}`}   radius={0}></ColorSwatch>
      <ColorSwatch size={14} color={`#${id.slice(54, 60)}`}   radius={0}></ColorSwatch>
    </Group>
  )
}
