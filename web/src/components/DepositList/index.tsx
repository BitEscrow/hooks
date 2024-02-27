import { useState }       from 'react'
import { IconZoomScan }   from '@tabler/icons-react'
import { useDepositList } from '@scrow/hooks/deposit'

import {
  DepositData,
  EscrowSigner
} from '@scrow/core'

import {
  Table,
  ScrollArea,
  Paper,
  Modal,
  TextInput,
  NumberInput,
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

  const [selectedRow, setSelectedRow] = useState<DepositData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = (row : DepositData) => {
    setSelectedRow(row)
    setIsModalOpen(true)
  }

  const rows = data.map((row) => (
    <tr key={row.dpid} onClick={() => handleRowClick(row)} className={styles.tableRow}>
      <td><span style={{color: '#54B251'}}>{row.agent_id}</span></td>
      <td><span style={{ color: '#0068FE' }}>{row.dpid}</span></td>
      <td>{row.txid}</td>
      <td>{row.created_at}</td>
      <td>{row.value} sats</td>
      <td style={{ textAlign: 'center', color: 'gray' }}>
        <IconZoomScan/>
      </td>
    </tr>
  ))
    
  return (
    <>
      { isLoading && <Center><Loader color="blue" /></Center> }
      { !isLoading && data.length > 0 ? (
        <ScrollArea>
        <Paper>
            <Table style={{ minWidth: '500px', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Agent ID</th>
                  <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>DPID</th>
                  <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>TXID</th>
                  <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Created At</th>
                  <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Value</th>
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
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contract Details"
      >
        { selectedRow && (
          <>
            <TextInput label="Agent ID" value={selectedRow.agent_id} readOnly />
            <TextInput label="Agent PK" value={selectedRow.agent_pk} readOnly />
            <TextInput label="Agent PN" value={selectedRow.agent_pn} readOnly />
            <TextInput label="Block Hash" value={selectedRow.block_hash || "N/A"} readOnly />
            <TextInput label="Block Height" value={selectedRow.block_height?.toString() || "N/A"} readOnly />
            <TextInput label="Block Time" value={selectedRow.block_time?.toString() || "N/A"} readOnly />
            <TextInput label="Confirmed" value={selectedRow.confirmed ? "Yes" : "No"} readOnly />
            <TextInput label="Created At" value={selectedRow.created_at.toString()} readOnly />
            <TextInput label="Deposit PK" value={selectedRow.deposit_pk} readOnly />
            <TextInput label="DPID" value={selectedRow.dpid} readOnly />
            <TextInput label="Return PSIG" value={selectedRow.return_psig || "N/A"} readOnly />
            <TextInput label="Script Key" value={selectedRow.scriptkey} readOnly />
            <TextInput label="Sequence" value={selectedRow.sequence.toString()} readOnly />
            <TextInput label="Settled" value={selectedRow.settled ? "Yes" : "No"} readOnly />
            <TextInput label="Settled At" value={selectedRow.settled_at?.toString() || "N/A"} readOnly />
            <TextInput label="Spend XPUB" value={selectedRow.spend_xpub} readOnly />
            <TextInput label="Spent" value={selectedRow.spent ? "Yes" : "No"} readOnly />
            <TextInput label="Spent At" value={selectedRow.spent_at?.toString() || "N/A"} readOnly />
            <TextInput label="Spent TXID" value={selectedRow.spent_txid || "N/A"} readOnly />
            <TextInput label="TXID" value={selectedRow.txid} readOnly />
            <TextInput label="Updated At" value={selectedRow.updated_at.toString()} readOnly />
            <NumberInput label="Value" value={selectedRow.value} readOnly rightSection="sats"/>
            <TextInput label="Vout" value={selectedRow.vout.toString()} readOnly />
          </>
        )}
      </Modal>
    </>
  )
}
