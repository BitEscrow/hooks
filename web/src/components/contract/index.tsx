import {
  Text,
  Title,
  Card
}                     from "@mantine/core";
import ContractTable  from "./table";

export default function ContractView() {
  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Title order={2} mb={15}>Contracts</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
       This is a list of contracts assigned to your pubkey. You can click on any one of them in the table to view the details.
      </Text>
          <ContractTable/> 
    </Card>
  )
}