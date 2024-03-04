export interface DepositData {
  agent_id     : string
  agent_pk     : string
  agent_pn     : string
  block_hash   : string | null
  block_height : number | null
  block_time   : number | null
  confirmed    : boolean
  // covenant     : CovenantData | null
  created_at   : number
  deposit_pk   : string
  dpid         : string
  expires_at   : number
  return_psig  : string | null
  scriptkey    : string
  sequence     : number
  settled      : boolean
  settled_at   : number | null
  spend_xpub   : string
  spent        : boolean,
  spent_at     : number | null
  spent_txid   : string | null
  // status       : DepositStatus
  txid         : string
  updated_at   : number
  value        : number
  vout         : number
}

export interface Props {
  data?: DepositData;
}
  