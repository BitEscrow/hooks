import { useNavigate }     from 'react-router-dom'
import { EscrowSigner }    from '@scrow/core'
import { useContractList } from '@scrow/hooks/contract'
import { IconZoomScan }    from '@tabler/icons-react'

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
  const { data, isLoading } = useContractList(signer)

  const navigate = useNavigate()

  const load = (cid : string) => {
    navigate(`/contracts/${cid}`)
  }

  const rows = data.map((row) => (
    <tr key={row.cid} onClick={() => load(row.cid)} className={styles.tableRow}>
      <td>{row.terms.title}</td>
      <td>{row.status}</td>
      <td>{row.balance} sats</td>
      <td>{row.total} sats</td>
      <td style={{ textAlign: 'center', color: 'gray' }}>
          <IconZoomScan/>
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
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Title</th>
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Status</th>
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Balance</th>
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Total</th>
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}></th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </Table>
                </Paper>
              </ScrollArea>
            ) : (
              <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
                  <Text c="dimmed">You have no active contracts.</Text>
              </Center>
            )}
          </>
        }
    </>
  )
}
