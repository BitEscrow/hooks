import { useState }   from 'react'
import { useParams }  from 'react-router-dom'
import { useDeposit } from '@scrow/hooks/deposit'
import { useClient }  from '@scrow/hooks/client'

import {
  Card,
  Loader,
  Center
} from '@mantine/core'

import DepositPanel  from './components/panel'
import DepositHeader from './components/header'

export default function () {
  const { dpid }   = useParams()
  const { client } = useClient()

  const { data, isLoading } = useDeposit(client, dpid || '')

  const [ view, setView ] = useState('fields')

  return (
    <Card>
      <DepositHeader data={ data } setView={setView} />
      { isLoading && <Center><Loader color="blue" /></Center> }
      { data && !isLoading && <DepositPanel data={data} view={view} /> }
    </Card>
  )
}
