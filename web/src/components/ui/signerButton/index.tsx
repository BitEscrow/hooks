import { useSigner }      from '@/hooks/useSigner'
import {
  ColorSwatch,
  Group,
  ActionIcon
} from '@mantine/core';

import {
  IconKey, 
} from '@tabler/icons-react'

interface Props {
  side_opened : boolean
  side_toggle : () => void
}

interface SwatchProps {
  id : string
}

export default function SignerButton(props: Props) {
  
  const { signer } = useSigner()
  const { side_toggle } = props

  const style = {
    borderRadius : signer !== null ? '0px 5px 5px 0px' : '5px 5px 5px 5px'
  }

  return (
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
  );
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
