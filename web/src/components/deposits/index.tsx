import {
  Title,
  Text,
  Card,
  // Button,
  // Box,
  Divider
}                     from "@mantine/core";
import DepositsTable  from "./DepositTable";
import SearchDpid     from "./searchDpid";

export default function DepositView() {

  return (
    <Card style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
      <Title order={2} mb={15}>Deposits</Title>
      <Text c="dimmed" style={{ marginBottom: '20px' }} maw='500px'>
      This is a list of deposits assigned to your pubkey. You can click on any one of them in the table to view the details.
      </Text>
      <Divider mb={30} mt={20} />
      <DepositsTable /> 
      {/* <Box style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button
          bg='#0068FD'
          radius={15}
          style={{ marginTop: '20px' }} 
          maw={200}
          >
          New Deposit
        </Button>
      </Box> */}
      <Divider mb={30} mt={20} />
      <SearchDpid/>
    </Card>
  )
}