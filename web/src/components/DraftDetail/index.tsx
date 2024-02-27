import { useSigner }    from '@/hooks/useSigner'
import { DraftSession } from '@scrow/core'

import {
  useEffect,
  useState
} from 'react'

export default function () {

  const store = useSigner()

  const [ draftId, setId ]      = useState<string | null>(null)
  const [ relay, setRelay ]     = useState<string | null>(null)
  const [ session, setSession ] = useState<DraftSession | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.has('id') && params.has('relay')) {
      setId(params.get('id'))
      setRelay(params.get('relay'))
    }
  }, [ draftId, relay ])

  useEffect(() => {
    if (
      store.signer !== null && 
      relay        !== null && 
      draftId      !== null
    ) {
      const sess = new DraftSession(store.signer)
      sess.connect(relay, draftId).then(() => setSession(sess))
    }
  }, [ store.signer ])

  return (
    <>
      { store.signer === null &&
        <p>Please login to a signing device to view this draft.</p>
      }
      { session !== null && 
        <pre>
          {JSON.stringify(session.data, null, 2)}
        </pre>
      }
    </>
  )
}
