import React, { useState } from 'react';
import { useSigner } from '@/hooks/useSigner'
import { IconKey }   from '@tabler/icons-react'

import {
  ColorSwatch,
  Group,
  ActionIcon,
  Popover,
  Modal
} from '@mantine/core'

import { useMediaQuery } from '@mantine/hooks'

import UserView from '../drawer'

interface SwatchProps {
  id : string
}

export default function SignerButton () {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { signer } = useSigner()
  const [opened, setOpened] = useState(false);

  const content = (
    <>
      {signer !== null && <IdSwatch id={signer.pubkey} />}
      <ActionIcon
        bg={signer !== null ? 'green' : '#0068FD'}
        size={35}
        variant="filled"
        aria-label="Signer"
        onClick={() => setOpened(true)}
        style={{ borderRadius: '10px' }}
      >
        <IconKey style={{ width: '70%', height: '70%' }} size={45} />
      </ActionIcon>
    </>
  );

  return (
    <>
    {isMobile ? (
      <>
        <Group
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '10px',
            zIndex: 999,
          }}
        >
          {content}
        </Group>
        <Modal
          fullScreen
          opened={opened}
          onClose={() => setOpened(false)}
          title="User Details"
        >
          <UserView />
        </Modal>
      </>
    ) : (
      <Popover
        position="top-end"
        offset={5}
        width={350}
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside={false}
      >
        <Popover.Target>
          <Group
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '10px',
              zIndex: 999,
            }}
          >
            {content}
          </Group>
        </Popover.Target>
        <Popover.Dropdown>
          <UserView />
        </Popover.Dropdown>
      </Popover>
    )}
  </>
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
