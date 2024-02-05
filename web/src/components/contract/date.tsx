import { Table }        from '@mantine/core'
import { ContractData } from '@scrow/core'

import styles from '../styles.module.css'

import { convert_date } from '@/lib/date'

interface Props {
  data : ContractData
}

export default function ContractDateView ({ data } : Props) {
  const { 
    activated, deadline, expires_at, published,
    settled_at, spent_at, updated_at
  } = data
  
  const date_activated = (activated !== null) 
    ? convert_date(activated).toLocaleString()
    : 'not active'

  const date_deadline = convert_date(deadline).toLocaleString()

  const date_expires = (expires_at !== null) 
    ? convert_date(expires_at).toLocaleString()
    : 'not active'

  const date_published = convert_date(published).toLocaleString()

  const date_settled = (settled_at !== null) 
    ? convert_date(settled_at).toLocaleString()
    : 'no spending txid'

  const date_spent = (spent_at !== null) 
    ? convert_date(spent_at).toLocaleString()
    : 'no spending txid'

  const date_updated = convert_date(updated_at).toLocaleString()

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className={styles.title}>Dates</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td className={styles.label}>Activated</Table.Td>
          <Table.Td className={styles.value}>{date_activated}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Deadline</Table.Td>
          <Table.Td className={styles.value}>{date_deadline}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Expires</Table.Td>
          <Table.Td className={styles.value}>{date_expires}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Published</Table.Td>
          <Table.Td className={styles.value}>{date_published}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Settled</Table.Td>
          <Table.Td className={styles.value}>{date_settled}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Spent</Table.Td>
          <Table.Td className={styles.value}>{date_spent}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Updated</Table.Td>
          <Table.Td className={styles.value}>{date_updated}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}
