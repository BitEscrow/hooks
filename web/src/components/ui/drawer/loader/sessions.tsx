import { useSigner } from '@/hooks/useSigner'

import {
  Dispatch,
  SetStateAction,
  useState
} from 'react'

import {
  Center,
  Modal,
  Checkbox,
  Button,
  Text
} from '@mantine/core'

import {
  IconKey,
  IconTrash,
} from '@tabler/icons-react'

interface Props {
  setPub   : Dispatch<SetStateAction<string | null>>
}

export default function ({ setPub } : Props) {
  const { session } = useSigner()

  const [isConfirmOpen, setIsConfirmOpen]     = useState(false)
  const [deleteConfirmed, setDeleteConfirmed] = useState(false)
  const [pubkeyToDelete, setPubkeyToDelete]   = useState<string | null>(null)
  
  const handleDeleteClick = (pubkey: string) => {
    setPubkeyToDelete(pubkey)
    setIsConfirmOpen(true)
  }

  const confirmDelete = () => {
    if (pubkeyToDelete) {
      session.remove(pubkeyToDelete)
      setPubkeyToDelete(null)
    }
    setIsConfirmOpen(false)
    setDeleteConfirmed(false)
  }

  return (
    <>
      <Center mih={100} mt={25}>
        <ul>
          { session.list.length > 0 
            && <Text fw={700} mb={10}>Previous Sessions</Text>
            || <Text fw={500} mb={10}>You don't have any saved sessions.</Text>
          }
          { session.list.map(([ pubkey ]) => (
            <li key={ pubkey } style={{ listStyleType: 'none', marginLeft: '-25px' }}>
              <IconKey size={18} style={{ marginRight: '5px', transform: 'translateY(3px)' }} /> 
              <span onClick={() => setPub(pubkey)} style={{ marginRight: '10px', fontFamily: 'monospace' }}>
                { pubkey.slice(0, 16) }
              </span>
              <button onClick={() => handleDeleteClick(pubkey)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '8px', transform: 'translateY(2px)' }}>
                <IconTrash size={17} color="red" />
              </button>
            </li>
          ))}
        </ul>
      </Center>
      <Modal opened={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} title="Confirm Delete">
        <Text size="sm" mb="md">
          Are you sure you want to remove this session? Before you do, be sure you have your keys and/or password backed up so you have access to it in the future.
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
    </>
  )
}