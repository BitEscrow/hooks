import { createStore }    from '@cmdcode/use-store'
import { ProposalData }   from '@scrow/core'
import { parse_proposal } from '@scrow/core/parse'

export interface AppStore {
  cid      : string
  proposal : ProposalData
}

const proposal = parse_proposal({
  title     : 'Basic two-party contract with third-party dispute resolution.',
  expires   : 14400,
  details   : 'n/a',
  network   : 'regtest',
  paths: [
    [ 'heads', 10000, 'alice' ],
    [ 'tails', 10000, 'bob'   ]
  ],
  payments : [
    [ 5000, 'carol' ]
  ],
  programs : [
    [ 'close',   '*', 'sign', 2, 'alice', 'bob' ],
    [ 'dispute', '*', 'sign', 1, 'alice', 'bob' ],
    [ 'resolve', '*', 'sign', 1, 'carol'        ]
  ],
  schedule: [
    [ 7200, 'close', 'heads|tails' ]
  ],
  value   : 15000,
  version : 1
})

const defaults : AppStore = {
  proposal,
  cid : 'daed3d6a782ca4b31286dc04be8b31852539e0647b097e359de3e55c75892432'
}

const session_key = 'escrow-playground'

export const { StoreProvider, useStore } = createStore({ defaults, session_key })
