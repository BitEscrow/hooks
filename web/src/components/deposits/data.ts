interface DepDataRow {
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
  
  const data : DepDataRow[] = [
	// {
	//   agent_id     : 'agent1',
	//   agent_pk     : 'pk1',
	//   agent_pn     : 'pn1',
	//   block_hash   : 'hash1',
	//   block_height : 100,
	//   block_time   : 1645372435,
	//   confirmed    : true,
	// //   covenant     : null,
	//   created_at   : 1645372435,
	//   deposit_pk   : 'deposit_pk1',
	//   dpid         : 'dpid1',
	//   expires_at   : 1645373435,
	//   return_psig  : null,
	//   scriptkey    : 'scriptkey1',
	//   sequence     : 1,
	//   settled      : false,
	//   settled_at   : null,
	//   spend_xpub   : 'spend_xpub1',
	//   spent        : false,
	//   spent_at     : null,
	//   spent_txid   : null,
	// //   status       : 'pending',
	//   txid         : 'txid1',
	//   updated_at   : 1645372435,
	//   value        : 1000,
	//   vout         : 0
	// },
	// {
	//   agent_id     : 'agent2',
	//   agent_pk     : 'pk2',
	//   agent_pn     : 'pn2',
	//   block_hash   : null,
	//   block_height : null,
	//   block_time   : null,
	//   confirmed    : false,
	// //   covenant     : null,
	//   created_at   : 1645373435,
	//   deposit_pk   : 'deposit_pk2',
	//   dpid         : 'dpid2',
	//   expires_at   : 1645374435,
	//   return_psig  : null,
	//   scriptkey    : 'scriptkey2',
	//   sequence     : 2,
	//   settled      : false,
	//   settled_at   : null,
	//   spend_xpub   : 'spend_xpub2',
	//   spent        : false,
	//   spent_at     : null,
	//   spent_txid   : null,
	// //   status       : 'pending',
	//   txid         : 'txid2',
	//   updated_at   : 1645373435,
	//   value        : 2000,
	//   vout         : 1
	// },
  ];
  
  export default data;
  