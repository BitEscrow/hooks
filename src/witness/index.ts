import { EscrowClient } from '@scrow/sdk/client'
import { assert }       from '@scrow/sdk/util'

import {
  WitnessDataResponse,
  WitnessListResponse,
  WitnessReceipt
} from '@scrow/sdk/core'

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

  const update = (witness : WitnessReceipt) => {
    res.mutate({ ...res.data, witness })
  }

  let data : WitnessReceipt | undefined

  if (res.data !== undefined) {
    data = res.data.witness
  }

  return { ...res, data, update }
}

export function useStatementList (
  client   : EscrowClient,
  vmid     : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (vmid !== null)
    ? `${host}/witness/list?vmid=${vmid}`
    : null

  const fetcher = async () => {
    assert.is_hash(vmid)
    const res   = await client.witness.list(vmid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<WitnessListResponse>(url, fetcher, options)

  let data : WitnessReceipt[] = []

  if (res.data !== undefined) {
    data = res.data.statements
  }

  const update = (new_receipts : WitnessReceipt[]) => {
    const statements = [ ...data, ...new_receipts ]
      .sort((a, b) => b.stamp - a.stamp)
    res.mutate({ ...res.data, statements })
  }

  return { ...res, data, update }
}
