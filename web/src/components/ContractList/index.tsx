import { useContractList } from '@scrow/hooks/contract'
import { IconZoomScan }    from '@tabler/icons-react'
import { useState }        from 'react'

import {
  ContractData,
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

export default function ({ signer } : Props) {

  const { data, isLoading } = useContractList(signer)

  const [selectedRow, setSelectedRow] = useState<ContractData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (row : ContractData) => {
    setSelectedRow(row)
    setIsModalOpen(true)
  }

  const rows = data.map((row) => (
    <tr key={row.cid} onClick={() => handleRowClick(row)} className={styles.tableRow}>
      <td>{row.terms.title}</td>
      <td><span style={{color: '#0068FE'}}>{row.cid}</span></td>
      <td>{row.published}</td>
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
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>CID</th>
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Date</th>
                        <th style={{ position: 'sticky', textAlign: 'left', top: 0, backgroundColor: 'white', color: 'black' }}>Role</th>
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
                  <Text c="dimmed">You have no active contracts.</Text>
              </Center>
            )}
          </>
        }
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Contract Details"
      >
      { selectedRow && (
            <>
            <TextInput
              label="Title"
              value={selectedRow.terms.title}
              readOnly
            />
            <TextInput
              label="CID"
              value={selectedRow.cid}
              readOnly
            />
            <TextInput
              label="Date"
              value={selectedRow.published}
              readOnly
            />
            <NumberInput
              label="Value"
              value={selectedRow.total}
              readOnly
              rightSection="sats"
              rightSectionWidth={50}
            />
        </>
      )}
      </Modal>
    </>
  )
}
