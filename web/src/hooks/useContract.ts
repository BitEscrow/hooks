import useSWR           from 'swr'
import { fetcher }      from '@/lib/fetcher'
import { useConfig }    from '@/context/useConfig'
import { now }          from '@scrow/core/util'
import { create_proof } from '@scrow/core/proof'

import {
  ContractData,
  Signer
} from '@scrow/core'

export function useContract (cid : string) {
  const { store } = useConfig()

  const url = `${store.config.host_url}/api/contract/${cid}`

  const { data, error, isLoading } = useSWR<ContractData>(url, fetcher)

  return { data, error, isLoading }
}

export function useContractList (signer : Signer) {
  const { store } = useConfig()

  const url = `${store.config.host_url}/api/contract/list`

  const tkn = create_proof(signer, url, { stamp : now() })
  const opt : RequestInit = { headers : { token : tkn } }
  
  console.log('url:', url)
  console.log('opt:', opt)

  const { data, error, isLoading } = useSWR<ContractData[]>(url, (url : string) => fetcher(url, opt))

  return { data, error, isLoading }
}
