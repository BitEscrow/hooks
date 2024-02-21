// import { useState } from 'react'
import {
  Card,
  Group,
  Text,
  Title,
  Divider,
}               from '@mantine/core'
import Network  from './network'

export default function SettingsView () {


  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
    <Group style={{ width: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Title order={2} mb={15}>Settings</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
       Adjust your settings for interacting with the API, such as changing networks.
      </Text>
      <Divider mb={30} mt={20} />
      <Network/>
      </div>
    </Group>
  </Card>
  )
}
