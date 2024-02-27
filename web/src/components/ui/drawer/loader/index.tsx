import { useSigner } from '@/hooks/useSigner'

import {
  Box,
  Center,
  PasswordInput,
  Modal,
  Checkbox,
  Button,
  Text,
  TextInput
} from '@mantine/core'

import { useState }   from 'react'

import ImportView     from './import'
import SeedView       from './seeds'
import ControlView    from './controls'
import UnlockView     from './unlock'

import {
  IconKey,
  IconCheck,
  IconTrash,
} from '@tabler/icons-react'


export default function LoaderView () {

  const { session } = useSigner()

  const [ selected, setSelected ] = useState<string | null>(null)

  const [ view,  setView  ] = useState('login')
  const [ pass,  setPass  ] = useState('')
  const [ xpub,  setXpub  ] = useState('')
  
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)
  const [pubkeyToDelete, setPubkeyToDelete] = useState<string | null>(null)

  const wallet_key = xpub !== '' ? xpub : undefined

  const handleDeleteClick = (pubkey: string) => {
    setPubkeyToDelete(pubkey)
    setIsConfirmOpen(true)
  };

  const confirmDelete = () => {
    if (pubkeyToDelete) {
      session.remove(pubkeyToDelete)
      setPubkeyToDelete(null)
    }
    setIsConfirmOpen(false)
    setDeleteConfirmed(false)
  };

  return (
    <Box>
      <ControlView view={view} setView={setView} />
      { view == 'login' &&
        <Center mih={100} mt={25}>
          <ul>
            {session.list.length > 0 && <Text fw={700} mb={10}>Previous Sessions:</Text>}  
            {session.list.map(([ pubkey ]) => (
              <div key={ pubkey }>
                <li style={{ listStyleType: 'none' }}>
                  <IconKey size={18} style={{ marginRight: '5px', transform: 'translateY(3px)' }} /> 
                  <span style={{ marginRight: '10px' }}>
                    {`${pubkey.slice(0, 7)}...${pubkey.slice(-7)}`}
                  </span>
                  <button onClick={() => setSelected(pubkey)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', transform: 'translateY(2px)' }}>
                    <IconCheck size={17} color="green" /> {/* Green check icon */}
                  </button>
                  <button onClick={() => handleDeleteClick(pubkey)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '8px', transform: 'translateY(2px)' }}>
                    <IconTrash size={17} color="red" /> {/* Red trashcan icon */}
                  </button>
                </li>
              </div>
            ))}
          </ul>
        </Center>
      }
      <PasswordInput
        c           = 'black'
        label       = { view === 'login' ? 'Password' : 'New Password' }
        placeholder = 'enter password ...'
        p={15}
        value       = {pass}
        onChange    = {(e) => setPass(e.target.value)}
      />
      { view !== 'login' &&
        <TextInput
          c           = 'black'
          label       = 'Wallet Key'
          placeholder = 'enter xpub ...'
          p={15}
          value       = {xpub}
          onChange    = {(e) => setXpub(e.target.value)}
        />
      }
      <Box>
          { view === 'create' && <SeedView   pass={pass} xpub={wallet_key} />}
          { view === 'import' && <ImportView pass={pass} xpub={wallet_key} />}
          { view === 'login'  && selected && <UnlockView pubkey={selected} pass={pass} />}
      </Box>
      <Modal opened={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title="Confirm Delete">
        <Text size="sm" mb="md">
          Are you sure you want to remove this pubkey session? Before you do, be sure you have your keys and/or password backed up so you have access to it in the future.
        </Text>
        <Center style={{ alignItems: 'center' }}>
          <Checkbox
            checked={deleteConfirmed}
            onChange={(event) => setDeleteConfirmed(event.currentTarget.checked)}
            mr="xs" 
          />
          <Text size="sm">I confirm that I have backed up my keys/password</Text>
        </Center>
        <Center mt="md">
          <Button color="red" onClick={confirmDelete} disabled={!deleteConfirmed}>
            Delete
          </Button>
        </Center>
      </Modal>
    </Box>
  )
}
