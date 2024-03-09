import {
  EscrowClient,
  OracleFeeEstimate,
  OracleSpendData,
  OracleTxData
} from '@scrow/core'

import useSWR from 'swr'

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
  client  : EscrowClient,
  address : string,
  disable = false
) {
  const host = client.oracle
  const url  = (disable) ? null : `${host}/addr/${address}`

  const fetcher = async () => {
    return client.oracle.get_address_utxos(address)
  }

  return useSWR<OracleSpendData[]>(url, fetcher)
}

export function useTransaction (
  client : EscrowClient,
  txid   : string,
  disable = false
) {
  const host = client.oracle
  const url  = (disable) ? null : `${host}/tx/${txid}`

  const fetcher = async () => {
    return client.oracle.get_txdata(txid)
  }

  return useSWR<OracleTxData | null>(url, fetcher)
}

export function useFeeRates (
  client : EscrowClient,
  disable = false
) {
  const host = client.oracle
  const url  = (disable) ? null : `${host}/estimate`

  const fetcher = async () => {
    if (client.network === 'mutiny') {
      // This is Ben's fault.
      return STUB_RATES
    }
    return client.oracle.fee_estimates()
  }

  return useSWR<OracleFeeEstimate>(url, fetcher)
}

export function useFeeTarget (
  client : EscrowClient,
  target : number,
  disable = false
) {
  const host = client.oracle
  const url  = (disable) ? null : `${host}/fee/${target}`

  const fetcher = async () => {
    return client.oracle.fee_target(target)
  }

  return useSWR<number>(url, fetcher)
}