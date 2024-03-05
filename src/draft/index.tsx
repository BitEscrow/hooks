import {
  useEffect,
  useRef,
  useState
} from 'react'

import {
  DraftData,
  DraftItem,
  DraftSession,
  EscrowSigner
} from '@scrow/core'

export function useDraftList (
  address : string,
  signer  : EscrowSigner
) {

  const [ init, setInit ]         = useState(false)
  const [ isLoading, setLoading ] = useState(false)
  const [ data, setDrafts ]       = useState<DraftItem[]>([])

  useEffect(() => {
    if (!init) {
      refresh()
      setInit(true)
    }
  }, [ init ])

  const refresh = async () => {
    setLoading(true)
    const list = await DraftSession.list(address, signer)
    setDrafts(list)
    setLoading(false)
  }

  const remove = (secret : string) => {
    const idx = data.findIndex(e => e.secret === secret)
    if (idx !== -1) {
      const session = new DraftSession(signer)
      session.once('ready', () => {
        session.delete()
        session.close()
      })
      session.connect(address, secret)
      data.splice(idx, 1)
      setDrafts([ ...data ])
    }
  }

  return { data, isLoading, refresh, remove }
}

export function useDraftSession (
  address : string,
  secret  : string,
  signer  : EscrowSigner
) {

  const session = useRef(new DraftSession(signer, { debug : true, verbose : true }))

  const [ data, setData ] = useState<DraftData | undefined>(undefined)

  const initialize = () => {
    const s = session.current
    s.once('ready', () => setData(s.data))
    s.on('fetch',   () => setData(s.data))
    s.on('update',  () => setData(s.data))
    s.on('reject', console.log)
    s.on('error', console.error)
    s.connect(address, secret)
  }

  useEffect(() => {
    if (!session.current.is_ready) {
      initialize()
    }
  }, [ session ])

  return { data, session: session.current }
}
