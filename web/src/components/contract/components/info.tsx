import { Table }        from '@mantine/core'
import { ContractData } from '@scrow/core'
import { shorten_str }  from '@/lib/util'

import styles from '../styles.module.css'

interface Props {
  data : ContractData
}

export default function ContractInfoView ({ data } : Props) {

  const { cid, terms }     = data
  const { title, details } = terms

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className={styles.title}>Contract Info</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td className={styles.label}>Title</Table.Td>
          <Table.Td className={styles.value}>{title}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Details</Table.Td>
          <Table.Td className={styles.value}>{details}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>CID</Table.Td>
          <Table.Td className={styles.value}>{shorten_str(cid)}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}
