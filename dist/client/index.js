import { jsx as _jsx } from "react/jsx-runtime";
import { EscrowClient } from '@scrow/core';
import { createContext, useContext, useState } from 'react';
const context = createContext(null);
export function ClientProvider({ children, config }) {
    const init_client = new EscrowClient(config);
    const [client, setClient] = useState(init_client);
    const update_config = (config) => {
        setClient(new EscrowClient(config));
    };
    return (_jsx(context.Provider, { value: { client, update_config }, children: children }));
}
export function useClient() {
    const ctx = useContext(context);
    if (ctx === null) {
        throw new Error('Context is null!');
    }
    return ctx;
}
//# sourceMappingURL=index.js.map