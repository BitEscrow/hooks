import { useState }  from 'react'
import { useSigner } from '@/hooks/useSigner'

import {
  assert,
  DepositData
} from '@scrow/core'

import {
  useClient,
  useFeeRates
} from '@scrow/hooks'

import { Button, Collapse, NumberInput, Slider, Text } from '@mantine/core'

interface Props {
  data   : DepositData
  opened : boolean
}

export default function ({ data, opened } : Props) {
  const { client } = useClient()
  const { signer } = useSigner()

  const { data : fees, isLoading } = useFeeRates(client, !opened)

  const [ slider, setSlider   ] = useState(1)
  const [ feerate, setFeerate ] = useState(1)

  const close = async () => {
    assert.exists(signer)
    const fee = feerate * 65
    const req = signer.account.close(data, fee)
    const res = await client.deposit.close(data.dpid, req)
    if (!res.ok) throw new Error(res.error)
  }

  const update_fee = (e : number) => {
    if (fees !== undefined) {
      const count = (e < 20) ? 1 : Math.floor(e / 10)
      setFeerate(fees[String(count)])
    }
  }

  return (
    <>
      { isLoading && <></> }
      { !isLoading && fees !== undefined &&
        <Collapse in={opened} mt={10}>
          <Text>Select a fee-rate for your closing transaction:</Text>
          <Slider
            m={10}
            p={20}
            label="Fee Target"
            value={slider}
            onChange={setSlider}
            onChangeEnd={(e) => update_fee(e)}
            marks={[
              { value: 1,   label : 'Next Block' },
              { value: 30,  label : '3 Blocks'   },
              { value: 60,  label : '6 Blocks'   },
              { value: 100, label : '10 Blocks'  }
            ]}
          />
          <NumberInput
            mt={25}
            value={feerate}
            onChange={(e) => setFeerate(Number(e))}
            min={1}
            max={1000}
            suffix=" sats per vbyte"
          />
          <Text mt={10}>TxFee Total: {feerate * 65} sats</Text>
          <Button mt={10} w='100%' onClick={close}>Confirm</Button>
        </Collapse>
      }
    </>
  )
}
