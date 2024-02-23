import {
  Card,
  Group,
  Text,
  Divider,
  Title,
} from '@mantine/core'


export default function NewDepositView() {
  
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Group style={{ width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Title order={2} mb={15}>Create a New Deposit</Title>
          <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
            This is filler text
          </Text>
        </div>
      </Group>
      <Divider mb={30} mt={20} />
  </Card>
  )
}
