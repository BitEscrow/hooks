import { useNavigate }  from 'react-router-dom'
import { useDraftList } from '@scrow/hooks/draft'
import { useConfig }    from '@/hooks/useConfig'
import { IconTrash }    from '@tabler/icons-react'

import {
  DraftSession,
  EscrowSigner
} from '@scrow/core'

import {
  Table,
  ScrollArea,
  Paper,
  Center,
  Text,
  Loader
} from '@mantine/core'

import styles from './styles.module.sass'

interface Props {
  signer : EscrowSigner
}

export default function ({ signer } : Props) {

  const { store } = useConfig()
  const navigate = useNavigate()

  const { data, isLoading } = useDraftList(store.relay, signer)

  console.log('data:', data)

  const load_draft = (secret : string) => {
    navigate(`/drafts/${secret}`)
  }

  const delete_draft = (secret : string) => {
    const session = new DraftSession(secret, signer)
    session.delete()
  }

  const rows = data.map((row) => (
    <tr key={row.id} className={styles.tableRow}>
      <td><span onClick={() => load_draft(row.secret)} style={{color: '#54B251'}}>{row.id}</span></td>
      <td><span style={{ color: '#0068FE' }}>{row.updated_at}</span></td>
      <td>
        <button onClick={() => delete_draft(row.secret)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '8px', transform: 'translateY(2px)' }}>
          <IconTrash size={17} color="red" />
        </button>
      </td>
    </tr>
  ))

  return (
    <>
      { isLoading && <Center><Loader color="blue" /></Center> }
      { !isLoading &&
        <>
          { data.length > 0 ? (
            <ScrollArea>
              <Paper>
                <Table style={{ minWidth: '500px', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Session ID</th>
                      <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Updated At</th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </Table>
              </Paper>
            </ScrollArea>
          ) : (
            <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
              <Text c="dimmed">You have no active drafts.</Text>
            </Center>
          )}
        </>
      }
    </>
  )
}
