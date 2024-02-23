import { useState, useReducer } from 'react';
export function initStore(defaults, session_key) {
    let cacher, data = defaults;
    if (session_key !== undefined) {
        const [session, setSession] = useSessionStore(session_key, defaults);
        cacher = setSession;
        data = session;
    }
    function reducer(store, action) {
        const { type, payload } = action;
        switch (type) {
            case 'reset':
                if (cacher !== undefined) {
                    cacher(payload);
                }
                return payload;
            case 'update':
                const new_store = { ...store, ...payload };
                if (cacher !== undefined) {
                    cacher(new_store);
                }
                return new_store;
            default:
                throw new Error(`Invalid action: ${String(type)}`);
        }
    }
    const [store, dispatch] = useReducer(reducer, data);
    function reset(store = {}) {
        const payload = { ...defaults, ...store };
        dispatch({ type: 'reset', payload });
    }
    function update(store) {
        dispatch({ type: 'update', payload: store });
    }
    return {
        reset,
        store,
        update
    };
}
function useSessionStore(key, defaults) {
    const get_init_value = () => {
        const stored_value = sessionStorage.getItem(key);
        if (stored_value === undefined ||
            stored_value === null)
            return defaults;
        try {
            return JSON.parse(stored_value);
        }
        catch (err) {
            throw new Error('failed to parse value from key: ' + key);
        }
    };
    const [session, setValue] = useState(get_init_value);
    const setSession = (value) => {
        try {
            const value_to_store = value instanceof Function
                ? value(session)
                : value;
            setValue(value_to_store);
            sessionStorage.setItem(key, JSON.stringify(value_to_store));
        }
        catch (err) {
            throw new Error('failed to serialize data to session store: ' + String(value));
        }
    };
    return [session, setSession];
}
//# sourceMappingURL=store.js.map