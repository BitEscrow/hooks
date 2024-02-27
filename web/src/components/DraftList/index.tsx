import { useNavigate }  from 'react-router-dom'
import { useDraftList } from '@scrow/hooks/draft'
import { useConfig }    from '@/hooks/useConfig'
import { EscrowSigner } from '@scrow/core'

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

  const load_draft = (id : string) => {
    navigate(`/drafts/${id}`)
  }

  const rows = data.map((row) => (
    <tr key={row.draft_id} onClick={() => load_draft(row.draft_id)} className={styles.tableRow}>
      <td><span style={{color: '#54B251'}}>{row.draft_id}</span></td>
      <td><span style={{ color: '#0068FE' }}>{row.updated_at}</span></td>
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
