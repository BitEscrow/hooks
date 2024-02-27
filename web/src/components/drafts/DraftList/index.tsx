import { useState }     from 'react'

import {
  Table,
  ScrollArea,
  Paper,
  Modal,
  TextInput,
  Center,
  Text
} from '@mantine/core'

import styles from './styles.module.sass'
import { DraftItem } from '@scrow/core'

interface Props {
  sessions : DraftItem[]
}

export default function DraftsTable({ sessions } : Props) {

  const [selectedRow, setSelectedRow] = useState<DraftItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleRowClick = (row : DraftItem) => {
    setSelectedRow(row)
    setIsModalOpen(true)
  }

  const rows = sessions.map((row) => (
    <tr key={row.draft_id} onClick={() => handleRowClick(row)} className={styles.tableRow}>
      <td><span style={{color: '#54B251'}}>{row.draft_id}</span></td>
      <td><span style={{ color: '#0068FE' }}>{row.updated_at}</span></td>
    </tr>
  ))

  return (
    <>
      { sessions.length > 0 ? (
        <ScrollArea>
          <Paper>
            <Table style={{ minWidth: '500px', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Draft Id</th>
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
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contract Details"
      >
        { selectedRow && (
          <>
            <TextInput label="Draft Id" value={selectedRow.draft_id} readOnly />
            <TextInput label="Updated At" value={selectedRow.updated_at} readOnly />
          </>
        )}
      </Modal>
    </>
  )
}
