import { useState }     from 'react';
import {
    Table,
    ScrollArea,
    Paper,
    Modal,
    TextInput,
    NumberInput,
    Center,
    Text
}                       from '@mantine/core'
import data       from './data';
import { IconZoomScan } from '@tabler/icons-react'
import styles 			from './styles.module.sass'

interface DepDataRow {
	agent_id     : string
	agent_pk     : string
	agent_pn     : string
	block_hash   : string | null
	block_height : number | null
	block_time   : number | null
	confirmed    : boolean
	// covenant     : CovenantData | null 
	created_at   : number
	deposit_pk   : string
	dpid         : string
	expires_at   : number
	return_psig  : string | null
	scriptkey    : string
	sequence     : number
	settled      : boolean
	settled_at   : number | null
	spend_xpub   : string
	spent        : boolean,
	spent_at     : number | null
	spent_txid   : string | null
	// status       : DepositStatus
	txid         : string
	updated_at   : number
	value        : number
	vout         : number
  }
  
export default function DraftsTable() {

    const [selectedRow, setSelectedRow] = useState<DepDataRow | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleRowClick = (row: DepDataRow) => {
        setSelectedRow(row);
        setIsModalOpen(true);
      };
      

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
    ));
    
    return (
        <>
        {data.length > 0 ? (
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
                <Text c="dimmed">You have no drafts. To create a new one, click "new propsoal" in the sidebar.</Text>
            </Center>
        )}
        <Modal
    opened={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    title="Contract Details"
>
    {selectedRow && (
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
            <TextInput label="Expires At" value={selectedRow.expires_at.toString()} readOnly />
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
    );
}
