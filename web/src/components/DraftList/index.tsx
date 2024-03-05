import { useNavigate }  from 'react-router-dom'
import { useDraftList } from '@scrow/hooks/draft'
import { useConfig }    from '@/hooks/useConfig'
import { IconTrash }    from '@tabler/icons-react'
import { EscrowSigner } from '@scrow/core'

import {
  Table,
  ScrollArea,
  Paper,
  Center,
  Text,
  Loader,
  Button
} from '@mantine/core'

import styles from './styles.module.sass'

interface Props {
  signer : EscrowSigner
}

export default function ({ signer } : Props) {

  const { store } = useConfig()
  const navigate = useNavigate()

  const { data, isLoading, refresh, remove } = useDraftList(store.relay, signer)

  const load_draft = (secret : string) => {
    navigate(`/drafts/${secret}`)
  }

  const rows = data.map((row) => (
    <tr key={row.topic_id} className={styles.tableRow}>
      <td><span onClick={() => load_draft(row.secret)} style={{color: '#54B251'}}>{row.topic_id}</span></td>
      <td><span style={{ color: '#0068FE' }}>{row.updated_at}</span></td>
      <td>
        <button onClick={() => remove(row.secret)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', marginLeft: '8px', transform: 'translateY(2px)' }}>
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
          <Button onClick={refresh}>Refresh</Button>
        </>
      }
    </>
  )
}
