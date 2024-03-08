import { useNavigate } from 'react-router-dom'
import { DepositData } from '@scrow/core'
import { IconLink }    from '@tabler/icons-react'

import { ActionIcon, Grid, Group, Paper, Text } from '@mantine/core'

import ProgressBar from './progress'

interface Props {
  data : DepositData
}

export default function ({ data } : Props) {

  const expires_at = (data.expires_at !== null)
    ? new Date(data.expires_at * 1000).toLocaleString()
    : null

  const navigate = useNavigate()

  const load = (dpid : string) => {
    navigate(`/deposits/${dpid}`)
  }

  return (
    <Paper 
      withBorder
      m={5}
      maw={500}
    >
      <Text p={5} truncate="end">{data.txid}</Text>
      <Text p={5}>{`Expires at ${expires_at}` ?? 'Unconfirmed'}</Text>
      <Grid grow p={5}>
        <Grid.Col span={10}>
          <Group>
            <Group>
              <Text>Status:</Text>
              <Text>{data.status}</Text>
            </Group>
            <Group>
              <Text>Value:</Text>
              <Text>{data.value} sats</Text>
            </Group>
          </Group>
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon onClick={() => load(data.dpid)} variant="filled" aria-label="Go to Deposit">
            <IconLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      <ProgressBar data={data} />
    </Paper>
  )
}
