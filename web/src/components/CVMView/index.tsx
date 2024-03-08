import { useState }    from 'react'
import { useParams }   from 'react-router-dom'
import { useContract } from '@scrow/hooks/contract'
import { useClient }   from '@scrow/hooks/client'

import {
  Card,
  Divider,
  Loader,
  Center
} from '@mantine/core'

import CVMPanel  from './components/panel'
import CVMHeader from './components/header'

export default function () {
  const { cid }    = useParams()
  const { client } = useClient()

  const { data, isLoading } = useContract(client, cid || '')

  const [ view, setView ] = useState('fields')

  return (
    <Card>
      <CVMHeader data={ data } setView={setView} />
      {/* <Divider mb={20} mt={20} /> */}
      { isLoading && <Center><Loader color="blue" /></Center> }
      { data && !isLoading && <CVMPanel data={data} view={view} /> }
    </Card>
  )
}
