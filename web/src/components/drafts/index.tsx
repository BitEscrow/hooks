import {
  Title,
  Text,
  Card,
  Divider,
}                     from "@mantine/core";
import DraftsTable    from "./table";

export default function DraftView() {
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Title order={2} mb={15}>Drafts</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
      This is a list of draft proposals assigned to your pubkey. You can click on any one of them in the table to view the details. 
      </Text>
      <Divider mb={30} mt={20}/>
      <DraftsTable /> 
    </Card>
  )
}