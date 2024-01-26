import { Fragment }     from 'react'
import { Table }        from '@mantine/core'
import { ContractData } from '@scrow/core'

import {
  random,
  shorten_str
}  from '@/lib/util'

import styles from '../styles.module.css'

interface Props {
  data : ContractData
}

export default function ContractFeesList ({ data } : Props) {
  const { fees } = data
  
  const rows = fees.map(([ amount, address ]) => (
    <Fragment key={random()}>
      <Table.Tr>
        <Table.Td className={styles.label}>Address</Table.Td>
        <Table.Td className={styles.value}>{shorten_str(address)}</Table.Td>
      </Table.Tr>
      <Table.Tr>
        <Table.Td className={styles.label}>Amount</Table.Td>
        <Table.Td className={styles.value}>{amount}</Table.Td>
      </Table.Tr>
    </Fragment>
  ))

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th className={styles.title}>Fees</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  )
}
