import { useState }     from 'react';
import {
    Table,
    ScrollArea,
    Paper,
    Modal,
    TextInput,
    NumberInput
}                       from '@mantine/core'
import data             from './data';
import { IconZoomScan } from '@tabler/icons-react'
import styles 			from './styles.module.sass'

interface DataRow {
    title: string;
    cid: string;
    date: string;
    role: string;
    value: number;
}
  
export default function ContractTable() {

    const [selectedRow, setSelectedRow] = useState<DataRow | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleRowClick = (row: DataRow) => {
        setSelectedRow(row);
        setIsModalOpen(true);
      };

    const rows = data.map((row) => (
        <tr key={row.cid} onClick={() => handleRowClick(row)} className={styles.tableRow}>
            <td>{row.title}</td>
            <td><span style={{color: '#0068FE'}}>{row.cid}</span></td>
            <td>{row.date}</td>
            <td>{row.role}</td>
            <td>{row.value} sats</td>
            <td style={{ textAlign: 'center', color: 'gray' }}>
                <IconZoomScan/>
            </td>
        </tr>
    ));
    
    return (
        <>
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

        <Modal
            opened={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Contract Details"
        >
        {selectedRow && (
              <>
              <TextInput
                label="Title"
                value={selectedRow.title}
                readOnly
              />
              <TextInput
                label="CID"
                value={selectedRow.cid}
                readOnly
              />
              <TextInput
                label="Date"
                value={selectedRow.date}
                readOnly
              />
              <TextInput
                label="Role"
                value={selectedRow.role}
                readOnly
              />
              <NumberInput
                label="Value"
                value={selectedRow.value}
                readOnly
                rightSection="sats"
                rightSectionWidth={50}
              />
            </>
            )}
        </Modal>
        </>
    );
}
