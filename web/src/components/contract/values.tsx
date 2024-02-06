import { Table }        from '@mantine/core'
import { ContractData } from '@scrow/core'

import styles from '../styles.module.css'

interface Props {
  data : ContractData
}

export default function ContractTotalView ({ data } : Props) {

  const { balance, pending, total } = data

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className={styles.title}>Values</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        <Table.Tr>
          <Table.Td className={styles.label}>Balance</Table.Td>
          <Table.Td className={styles.value}>{balance}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Pending</Table.Td>
          <Table.Td className={styles.value}>{pending}</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td className={styles.label}>Total</Table.Td>
          <Table.Td className={styles.value}>{total}</Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  )
}
