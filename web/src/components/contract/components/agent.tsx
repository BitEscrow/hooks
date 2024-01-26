import { Table }        from '@mantine/core'
import { ContractData } from '@scrow/core'
import { shorten_str }  from '@/lib/util'

import styles from '../styles.module.css'

interface Props {
  data : ContractData
}

export default function ContractAgentView ({ data } : Props) {

  const { agent_id, agent_key, record_pn } = data

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className={styles.title}>Agent Information</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td className={styles.label}>Id</Table.Td>
          <Table.Td className={styles.value}>{shorten_str(agent_id)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Pubkey</Table.Td>
          <Table.Td className={styles.value}>{shorten_str(agent_key)}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Root</Table.Td>
          <Table.Td className={styles.value}>{shorten_str(record_pn)}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}
