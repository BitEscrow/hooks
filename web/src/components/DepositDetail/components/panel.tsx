import { useDisclosure } from '@mantine/hooks'
import { DepositData } from '@scrow/core'

import { Accordion, Box, Button, Tabs } from '@mantine/core'

import ConfirmPanel    from './panels/confirm'
import CovenantPanel   from './panels/covenant'
import DepositPanel    from './panels/deposit'
import DetailsPanel    from './panels/details'
import SessionPanel    from './panels/session'
import TxPanel         from './panels/tx'
import JsonView        from './json'
import CloseForm       from './close'

interface Props {
  data : DepositData
  view : string
}

export default function ({ data, view } : Props) {

  const [ opened, { toggle } ] = useDisclosure(false)

  const can_close = data.status === 'open'

  return (
    <Box mt={20} maw={700}>
      <Tabs defaultValue="fields" value={view}>
        <Tabs.Panel value="fields">
          <Accordion defaultValue="details">
            <DetailsPanel data={data}  />
            <ConfirmPanel data={data}  />
            <CovenantPanel data={data} />
            <DepositPanel data={data}  />
            <SessionPanel data={data}  />
            <TxPanel data={data}       />
          </Accordion>
        </Tabs.Panel>

        <Tabs.Panel value="json">
          <JsonView data={data} />
        </Tabs.Panel>
      </Tabs>

      <Button
        w='100%'
        mt={10}
        disabled={!can_close}
        onClick={toggle}
        style={{ flex : 1 }}
      >
        { opened ? 'Dismiss' : 'Close Deposit' }
      </Button>
      <CloseForm data={data} opened={opened} />
    </Box>
  )
}

