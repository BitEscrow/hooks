import { useState, useReducer } from 'react'

// We can strictly type our dispatch actions here.
export type Action<T> =
  | { type: 'reset',  payload: T          }
  | { type: 'update', payload: Partial<T> }

export function initStore<T> (
  defaults     : T,
  session_key ?: string
) {
  /**
   * Create a reducer store with custom hooks, then
   * return it along with our Store API.
   */
  let cacher : (value: T) => void | undefined,
      data   : T = defaults

  if (session_key !== undefined) {
    const [ session, setSession ] = useSessionStore(session_key, defaults)
    cacher = setSession
    data   = session
  }

  function reducer (
    store  : T,
    action : Action<T>
  ) : T {
    const { type, payload } = action
    switch (type) {
      case 'reset':
        if (cacher !== undefined) {
          cacher(payload)
        }
        return payload
      case 'update':
        const new_store = { ...store, ...payload }
        if (cacher !== undefined) {
          cacher(new_store)
        }
        return new_store
      default:
        throw new Error(`Invalid action: ${String(type)}`)
    }
  }

  const [ store, dispatch ] = useReducer(reducer, data)

  function reset (store : Partial<T> = {}) {
    const payload = { ...defaults, ...store }
    dispatch({ type: 'reset', payload })
  }

  function update (store : Partial<T>) {
    dispatch({ type: 'update', payload: store })
  }

  return {
    reset,
    store,
    update
  }
}

function useSessionStore <T> (
  key: string, defaults: T
) : [ T, (value: T) => void ] {
  // Fetch from session storage and parse it as JSON. 
  // If it doesn't exist or parsing fails, use defaultValue.
  const get_init_value = () => {
    const stored_value = sessionStorage.getItem(key);
    
    if (
      stored_value === undefined ||
      stored_value === null
    ) return defaults
    
    try {
      return JSON.parse(stored_value) as T
    } catch (err) {
      throw new Error('failed to parse value from key: ' + key)
    }
  }

  const [ session, setValue ] = useState<T>(get_init_value)

  // Update session storage when the stored value is updated.
  const setSession = (value: T) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const value_to_store = value instanceof Function
        ? value(session)
        : value
      // Save state
      setValue(value_to_store)
      // Save to session storage
      sessionStorage.setItem(key, JSON.stringify(value_to_store))
    } catch (err) {
      // A more advanced implementation would handle the error case
      throw new Error('failed to serialize data to session store: ' + String(value))
    }
  }

  return [ session, setSession ]
}
