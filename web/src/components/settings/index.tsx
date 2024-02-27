import { useState }  from 'react'
import { servers }   from '@/config'
import { Network }   from '@scrow/core'
import { useConfig } from '@/hooks/useConfig'
import { useClient } from '@scrow/hooks/client'
import { useSigner } from '@/hooks/useSigner'

import {
  Card,
  Group,
  Text,
  Title,
  Divider,
  NativeSelect,
  Box,
  TextInput,
  Button,
  Space
} from '@mantine/core'

import {
  ToastContainer,
  toast,
  Slide
} from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export default function SettingsView () {

  const { store, update : update_config } = useConfig()
  const { update_config : update_client } = useClient()
  const { update_config : update_signer } = useSigner()

  const [ network, setNetwork ] = useState<Network>(store.network)
  const [ relay, setRelay ]     = useState<string>(store.relay)

  const update = () => {
    if (network !== store.network) {
      const config = servers[network as keyof typeof servers]
      update_client(config)
      update_signer(config)
      setNetwork(network)
    }
    update_config({ network, relay })
    toast.success(`Settings Updated`, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      transition: Slide,
    })
  }

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Group style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Title order={2} mb={15}>Settings</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            Adjust your settings for interacting with the API, such as changing networks.
          </Text>
          <Divider mb={30} mt={20} />
          <Box>
            <NativeSelect
              label="Choose Network"
              data={[ 'mutiny', 'signet', 'testnet' ]}
              maw={300}
              value={network}
              onChange={(e) => setNetwork(e.target.value as Network)}
            />
            <Space h="xs" />
            <TextInput
              label="Enter a Relay"
              maw={300}
              value={relay}
              onChange={(e) => setRelay(e.target.value)}
            />
            <Space h="xs" />
            <Button onClick={update}>Update</Button>
            <ToastContainer
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </Box>   
        </div>
      </Group>
    </Card>
  )
}
