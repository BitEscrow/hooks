import {
  assert,
  ContractData,
  ContractDataResponse,
  ContractListResponse,
  EscrowClient,
  EscrowSigner
} from '@scrow/core'

import useSWR from 'swr'

export function useContract (
  client : EscrowClient,
  cid    : string
) {
  const host = client.host
  const url  = `${host}/api/contract/${cid}`

  const fetcher = async () => {
    assert.is_hash(cid)
    const res = await client.contract.read(cid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<ContractDataResponse>(url, fetcher)

  let data : ContractData | undefined

  if (res.data !== undefined) {
    data = res.data.contract
  }

  return { ...res, data }
}

export function useContractList (
  signer : EscrowSigner
) {
  const client = signer.client
  const pub    = signer.pubkey
  const url    = `${client.host}/api/contract/list?pk=${pub}`

  const fetcher = async () => {
    const token = signer.request.contract_list()
    const res   = await client.contract.list(pub, token)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<ContractListResponse>(url, fetcher)

  let data : ContractData[] = []

  if (res.data !== undefined) {
    data = res.data.contracts
  }

  return { ...res, data }
}
