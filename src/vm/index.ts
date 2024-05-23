import { assert } from '@scrow/sdk/util'

import useSWR, { SWRConfiguration, useSWRConfig } from 'swr'

import {
  EscrowClient,
  EscrowSigner
} from '@scrow/sdk/client'

import {
  MachineData,
  VMDataResponse,
  VMListResponse,
  WitnessListResponse,
  WitnessReceipt
} from '@scrow/sdk'

export function useMachineData (
  client   : EscrowClient,
  vmid     : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (vmid !== null)
    ? `${host}/machine/${vmid}`
    : null

  const fetcher = async () => {
    assert.is_hash(vmid)
    const res = await client.machine.read(vmid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<VMDataResponse>(url, fetcher, options)

  const update = (vmdata : MachineData) => {
    res.mutate({ ...res.data, vmdata })
  }

  let data : MachineData | undefined

  if (res.data !== undefined) {
    data = res.data.vmdata
  }

  return { ...res, data, update }
}

export function useMachineUpdate (
  client : EscrowClient
) {
  const host       = client.server_url
  const { mutate } = useSWRConfig()

  return (
    vmid    : string,
    vmdata ?: MachineData
  ) => {
    mutate(`${host}/machine/${vmid}`, vmdata)
  }
}

export function useMachineList (
  client   : EscrowClient,
  signer   : EscrowSigner,
  options ?: SWRConfiguration
) {
  const host  = client.server_url
  const pub   = signer.pubkey
  const url   = `${host}/machine/list/${pub}`
  const token = signer.machine.list()

  const fetcher = async () => {
    const res = await client.machine.list(token)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<VMListResponse>(url, fetcher, options)

  let data : MachineData[] = []

  if (res.data !== undefined) {
    data = res.data.machines
  }

  return { ...res, data }
}

export function useReceiptList (
  client   : EscrowClient,
  vmid     : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (vmid !== null)
    ? `${host}/machine/${vmid}/receipts`
    : null

  const fetcher = async () => {
    assert.is_hash(vmid)
    const res   = await client.machine.receipts(vmid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<WitnessListResponse>(url, fetcher, options)

  let data : WitnessReceipt[] = []

  if (res.data !== undefined) {
    data = res.data.receipts
  }

  const update = (new_receipts : WitnessReceipt[]) => {
    const receipts = [ ...data, ...new_receipts ]
      .sort((a, b) => b.stamp - a.stamp)
    res.mutate({ ...res.data, receipts })
  }

  return { ...res, data, update }
}
