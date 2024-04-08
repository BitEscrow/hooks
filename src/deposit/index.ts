import { get_account_hash } from '@scrow/sdk/account'
import { assert }           from '@scrow/sdk/util'

import {
  AccountDataResponse,
  DepositData,
  DepositDataResponse,
  DepositListResponse,
} from '@scrow/sdk/core'

import {
  EscrowClient,
  EscrowSigner
} from '@scrow/sdk/client'

import useSWR from 'swr'

export function useAccount (
  client      : EscrowClient,
  locktime    : number,
  return_addr : string,
  signer      : EscrowSigner
) {
  const req  = signer.account.create(return_addr, locktime)
  const host = client.server_url
  const hash = get_account_hash(req)
  const url  = `${host}/api/account/${hash}`

  const fetcher = async () => {
    const res = await client.deposit.request(req)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  return useSWR<AccountDataResponse>(url, fetcher)
}

export function useDeposit (
  client : EscrowClient,
  dpid   : string
) {
  assert.is_hash(dpid)

  const host = client.server_url
  const url  = `${host}/api/deposit/${dpid}`

  const fetcher = async () => {
    const res = await client.deposit.read(dpid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<DepositDataResponse>(url, fetcher)

  let data : DepositData | undefined

  if (res.data !== undefined) {
    data = res.data.deposit
  }

  return { ...res, data }
}

export function useDepositList (
  client : EscrowClient,
  signer : EscrowSigner
) {
  const host  = client.server_url
  const pub   = signer.pubkey
  const url   = `${host}/api/deposit/list?pk=${pub}`
  const token = signer.deposit.list()

  const fetcher = async () => {
    const res = await client.deposit.list(pub, token)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<DepositListResponse>(url, fetcher)

  let data : DepositData[] = []

  if (res.data !== undefined) {
    data = res.data.deposits
  }

  return { ...res, data }
}