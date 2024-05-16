import { assert } from '@scrow/sdk/util'

import useSWR, { SWRConfiguration, useSWRConfig } from 'swr'

import {
  EscrowClient,
  EscrowSigner
} from '@scrow/sdk/client'

import {
  VMData,
  VMDataResponse,
  VMListResponse
} from '@scrow/sdk/core'

export function useVMData (
  client   : EscrowClient,
  vmid     : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (vmid !== null)
    ? `${host}/vm/${vmid}`
    : null

  const fetcher = async () => {
    assert.is_hash(vmid)
    const res = await client.vm.read(vmid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<VMDataResponse>(url, fetcher, options)

  const update = (vmdata : VMData) => {
    res.mutate({ ...res.data, vmdata })
  }

  let data : VMData | undefined

  if (res.data !== undefined) {
    data = res.data.vmdata
  }

  return { ...res, data, update }
}

export function useVMUpdate (
  client : EscrowClient
) {
  const host       = client.server_url
  const { mutate } = useSWRConfig()

  return (
    vmid    : string,
    vmdata ?: VMData
  ) => {
    mutate(`${host}/vm/${vmid}`, vmdata)
  }
}

export function useVMList (
  client   : EscrowClient,
  signer   : EscrowSigner,
  options ?: SWRConfiguration
) {
  const host  = client.server_url
  const pub   = signer.pubkey
  const url   = `${host}/vm/list?pk=${pub}`
  const token = signer.witness.list()

  const fetcher = async () => {
    const res = await client.vm.list(pub, token)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<VMListResponse>(url, fetcher, options)

  let data : VMData[] = []

  if (res.data !== undefined) {
    data = res.data.machines
  }

  return { ...res, data }
}
