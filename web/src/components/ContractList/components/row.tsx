import { useNavigate }  from 'react-router-dom'
import { ContractData } from '@scrow/core'
import { IconLink }     from '@tabler/icons-react'

import { ActionIcon, Grid, Group, Paper, Text } from '@mantine/core'

import ProgressBar from './progress'

interface Props {
  data : ContractData
}

export default function ({ data } : Props) {

  const updated_at = new Date(data.updated_at * 1000).toLocaleString()

  const navigate = useNavigate()

  const load = (cid : string) => {
    navigate(`/contracts/${cid}`)
  }

  return (
    <Paper 
      withBorder
      m={5}
      style={{}}
      maw={500}
    >
      <Text p={5}>{data.terms.title}</Text>
      <Text p={5}>Updated at {updated_at}</Text>
      <Grid grow p={5}>
        <Grid.Col span={10}>
          <Group>
            <Group>
              <Text>Status:</Text>
              <Text>{data.status}</Text>
            </Group>
            <Group>
              <Text>Total:</Text>
              <Text>{data.total} sats</Text>
            </Group>
          </Group>
        </Grid.Col>
        <Grid.Col span={2}>
          <ActionIcon onClick={() => load(data.cid)} variant="filled" aria-label="Go to Contract">
            <IconLink style={{ width: '70%', height: '70%' }} stroke={1.5} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
      <ProgressBar data={data} />
    </Paper>
  )
}
