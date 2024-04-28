import { assert } from '@scrow/sdk/util'

import useSWR, { SWRConfiguration, useSWRConfig } from 'swr'

import {
  ContractData,
  ContractDataResponse,
  ContractListResponse,
  FundListResponse,
  FundingData
} from '@scrow/sdk/core'

import {
  EscrowClient,
  EscrowSigner
} from '@scrow/sdk/client'

export function useContract (
  client   : EscrowClient,
  cid      : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (cid !== null)
    ? `${host}/contract/${cid}`
    : null

  const fetcher = async () => {
    assert.is_hash(cid)
    const res = await client.contract.read(cid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<ContractDataResponse>(url, fetcher, options)

  const update = (contract : ContractData) => {
    res.mutate({ ...res.data, contract })
  }

  let data : ContractData | undefined

  if (res.data !== undefined) {
    data = res.data.contract
  }

  return { ...res, data, update }
}

export function useContractUpdate (
  client : EscrowClient
) {
  const host       = client.server_url
  const { mutate } = useSWRConfig()

  return (
    cid       : string,
    contract ?: ContractData
  ) => {
    mutate(`${host}/contract/${cid}`, contract)
  }
}

export function useContractList (
  client   : EscrowClient,
  signer   : EscrowSigner,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const pub  = signer.pubkey
  const url  = `${host}/contract/list?pk=${pub}`

  const fetcher = async () => {
    const token = signer.contract.list()
    const res   = await client.contract.list(pub, token)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<ContractListResponse>(url, fetcher, options)

  let data : ContractData[] = []

  if (res.data !== undefined) {
    data = res.data.contracts
  }

  return { ...res, data }
}

export function useContractFunds (
  client   : EscrowClient,
  cid      : string | null,
  options ?: SWRConfiguration
) {
  const host = client.server_url
  const url  = (cid !== null)
    ? `${host}/contract/${cid}/funds`
    : null

  const fetcher = async () => {
    assert.exists(cid, 'client tried to fetch with a null value')
    const res   = await client.contract.funds(cid)
    if (!res.ok) throw new Error(res.error)
    return res.data
  }

  const res = useSWR<FundListResponse>(url, fetcher, options)

  let data : FundingData[] = []

  if (res.data !== undefined) {
    data = res.data.funds
  }

  const update = (new_funds : FundingData[]) => {
    const funds = [ ...data, ...new_funds ]
      .sort((a, b) => b.updated_at - a.updated_at)
    res.mutate({ ...res.data, funds })
  }

  return { ...res, data, update }
}
