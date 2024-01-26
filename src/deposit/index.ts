import {
  assert,
  DepositData,
  DepositDataResponse,
  DepositListResponse,
  EscrowSigner
} from '@scrow/core'

import useSWR from 'swr'

const DEFAULT_HOST = 'http://localhost:3000'

export function useDeposit (
  dpid : string,
  host : string = DEFAULT_HOST
) {
  assert.is_hash(dpid)

  const url = `${host}/api/deposit/${dpid}`
  const res = useSWR<DepositDataResponse>(url)

  let deposit : DepositData | undefined

  if (res.data !== undefined) {
    deposit = res.data.deposit
  }

  return { ...res, deposit }
}

export function useDepositList (
  signer : EscrowSigner
) {
  const client = signer.client
  const pub    = signer.pubkey
  const url    = `${client.host}/api/deposit/list?pubkey=${pub}`

  const fetcher = async () => {
    const pub   = signer.pubkey
    const token = signer.request.deposits()
    const res   = await client.deposit.list(pub, token)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<DepositListResponse>(url, fetcher)

  let deposits : DepositData[] = []

  if (res.data !== undefined) {
    deposits = res.data.deposits
  }

  return { ...res, deposits }
}