import {
  assert,
  DepositData,
  DepositDataResponse,
  DepositListResponse,
  EscrowClient,
  EscrowSigner
} from '@scrow/core'

import useSWR from 'swr'

export function useDeposit (
  client : EscrowClient,
  dpid   : string
) {
  const host = client.host
  const url  = `${host}/api/deposit/${dpid}`

  const fetcher = async () => {
    assert.is_hash(dpid)
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
  signer : EscrowSigner
) {
  const client = signer.client
  const pub    = signer.pubkey
  const url    = `${client.host}/api/deposit/list?pk=${pub}`

  const fetcher = async () => {
    const pub   = signer.pubkey
    const token = signer.request.deposit_list()
    const res   = await client.deposit.list(pub, token)
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