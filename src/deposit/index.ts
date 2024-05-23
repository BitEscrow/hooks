import { assert } from '@scrow/sdk/util'

import useSWR, { SWRConfiguration, useSWRConfig } from 'swr'

import {
  DepositData,
  DepositDataResponse,
  DepositListResponse,
} from '@scrow/sdk'

import {
  EscrowClient,
  EscrowSigner
} from '@scrow/sdk/client'

export function useDeposit (
  client   : EscrowClient,
  dpid     : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (dpid !== null) 
    ? `${host}/deposit/${dpid}`
    : null 

  const fetcher = async () => {
    assert.is_hash(dpid)
    const res = await client.deposit.read(dpid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<DepositDataResponse>(url, fetcher, options)

  const update = (deposit : DepositData) => {
    res.mutate({ ...res.data, deposit })
  }

  let data : DepositData | undefined

  if (res.data !== undefined) {
    data = res.data.deposit
  }

  return { ...res, data, update }
}

export function useDepositUpdate (
  client : EscrowClient
) {
  const host       = client.server_url
  const { mutate } = useSWRConfig()

  return (
    dpid     : string,
    deposit ?: DepositData
  ) => {
    mutate(`${host}/deposit/${dpid}`, deposit)
  }
}

export function useDepositList (
  client   : EscrowClient,
  signer   : EscrowSigner,
  options ?: SWRConfiguration
) {
  const host  = client.server_url
  const pub   = signer.pubkey
  const url   = `${host}/deposit/list/${pub}`
  const token = signer.deposit.list()

  const fetcher = async () => {
    const res = await client.deposit.list(token)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<DepositListResponse>(url, fetcher, options)

  let data : DepositData[] = []

  if (res.data !== undefined) {
    data = res.data.deposits
  }

  return { ...res, data }
}
