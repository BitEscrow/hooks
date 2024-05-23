import { EscrowClient } from '@scrow/sdk/client'
import { assert }       from '@scrow/sdk/util'

import {
  WitnessDataResponse,
  WitnessReceipt
} from '@scrow/sdk'

import useSWR, { SWRConfiguration } from 'swr'

export function useWitnessData (
  client   : EscrowClient,
  wid      : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (wid !== null)
    ? `${host}/witness/${wid}`
    : null

  const fetcher = async () => {
    assert.is_hash(wid)
    const res = await client.witness.read(wid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<WitnessDataResponse>(url, fetcher, options)

  const update = (receipt : WitnessReceipt) => {
    res.mutate({ ...res.data, receipt })
  }

  let data : WitnessReceipt | undefined

  if (res.data !== undefined) {
    data = res.data.receipt
  }

  return { ...res, data, update }
}
