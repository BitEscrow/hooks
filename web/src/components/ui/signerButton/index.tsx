import { useSigner } from '@/hooks/useSigner'
import { IconKey }   from '@tabler/icons-react'

import {
  ColorSwatch,
  Group,
  ActionIcon,
  Popover
} from '@mantine/core'

import UserView from '../drawer'

interface SwatchProps {
  id : string
}

export default function SignerButton () {
  
  const { signer } = useSigner()

  return (
    <Popover 
      position="top-end" 
      offset={5} 
      width={350}
      closeOnClickOutside={false}
    >
      <Popover.Target>
        <Group
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '10px', 
            zIndex: 999, 
        }}>
        { signer !== null && <IdSwatch id={signer.pubkey} /> }
          <ActionIcon
            bg={ signer !== null ? 'green' : '#0068FD' }
            size={35}
            variant    = "filled"
            aria-label = "Signer"
            style={{ borderRadius: '10px' }}
          >
            <IconKey style={{ width  : '70%', height : '70%' }} size={45} />
          </ActionIcon>
        </Group>
      </Popover.Target>
      <Popover.Dropdown>
        <UserView />
      </Popover.Dropdown>
    </Popover>
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
