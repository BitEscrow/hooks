import { EscrowClient } from '@scrow/sdk/client'
import { assert }       from '@scrow/sdk/util'

import {
  OracleFeeEstimate,
  OracleUtxoData,
  OracleTxData
} from '@scrow/sdk'

import useSWR, { SWRConfiguration } from 'swr'

const STUB_RATES = {
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  '11': 1,
  '12': 1,
  '13': 1,
  '14': 1,
  '15': 1,
  '16': 1,
  '17': 1,
  '18': 1,
  '19': 1,
  '20': 1,
  '21': 1,
  '22': 1,
  '23': 1,
  '24': 1,
  '25': 1,
  '144': 1,
  '504': 1,
  '1008': 1
}

export function usePayAddress (
  client   : EscrowClient,
  address  : string | null,
  options ?: SWRConfiguration
) {
  const host = client.oracle
  const url  = (address !== null)
    ? `${host}/addr/${address}`
    : null

  const fetcher = async () => {
    assert.exists(address)
    return client.oracle.get_address_utxos(address)
  }

  return useSWR<OracleUtxoData[]>(url, fetcher, options)
}

export function useTransaction (
  client   : EscrowClient,
  txid     : string | null,
  options ?: SWRConfiguration
) {
  const host = client.oracle
  const url  = (txid !== null) ? `${host}/tx/${txid}` : null

  const fetcher = async () => {
    assert.is_hash(txid)
    return client.oracle.get_tx(txid)
  }

  return useSWR<OracleTxData | null>(url, fetcher, options)
}

export function useFeeRates (
  client   : EscrowClient,
  options ?: SWRConfiguration
) {
  const host = client.oracle
  const url  = `${host}/estimate`

  const fetcher = async () => {
    if (client.network === 'mutiny') {
      // This is Ben's fault.
      return STUB_RATES
    }
    return client.oracle.get_fee_estimates()
  }

  return useSWR<OracleFeeEstimate>(url, fetcher, options)
}

export function useFeeTarget (
  client   : EscrowClient,
  target   : number,
  options ?: SWRConfiguration
) {
  const host = client.oracle
  const url  = `${host}/fee/${target}`

  const fetcher = async () => {
    return client.oracle.get_fee_target(target)
  }

  return useSWR<number>(url, fetcher, options)
}