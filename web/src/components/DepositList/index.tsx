import { useNavigate }    from 'react-router-dom'
import { EscrowSigner }   from '@scrow/core'
import { IconZoomScan }   from '@tabler/icons-react'
import { useDepositList } from '@scrow/hooks/deposit'

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

export default function DepositsTable({ signer } : Props) {

  const { data, isLoading } = useDepositList(signer)

  const navigate = useNavigate()

  const load = (dpid : string) => {
    navigate(`/deposits/${dpid}`)
  }

  const rows = data.map((row) => (
    <tr key={row.dpid} onClick={() => load(row.dpid)} className={styles.tableRow}>
      <td><span style={{color: '#54B251'}}>{row.txid}</span></td>
      <td>{row.vout}</td>
      <td>{row.value} sats</td>
      <td>{row.status}</td>
      <td style={{ textAlign: 'center', color: 'gray' }}>
        <IconZoomScan/>
      </td>
    </tr>
  ))
    
  return (
    <>
      { isLoading  && <Center><Loader color="blue" /></Center> }
      { !isLoading &&
        <>
          { data.length > 0 ? (
            <ScrollArea>
            <Paper>
              <Table style={{ minWidth: '500px', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>TXID</th>
                    <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Index</th>
                    <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Value</th>
                    <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Status</th>
                    <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}></th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Paper>
            </ScrollArea>
          ) : (
            <Center mt={50} mb={50} style={{ width: '100%', height: '100%', padding: '20px' }}>
              <Text c="dimmed">You have no deposits</Text>
            </Center>
          )}
        </>
      }
    </>
  )
}
