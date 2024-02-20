import {
  Title,
  Text,
  Card
}                     from "@mantine/core";
import DepositsTable  from "./table";

export default function DepositView() {
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Title order={2} mb={15}>Depostis</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
      This is a list of deposits assigned to your pubkey. You can click on any one of them in the table to view the details.
      </Text>
          <DepositsTable/> 
    </Card>
  )
}