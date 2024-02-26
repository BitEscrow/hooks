import { jsx as _jsx } from "react/jsx-runtime";
import { EscrowClient } from '@scrow/core';
import { createContext, useContext } from 'react';
const context = createContext(null);
export function ClientProvider({ children, config }) {
    const client = new EscrowClient(config);
    return (_jsx(context.Provider, { value: client, children: children }));
}
export function useClient() {
    const ctx = useContext(context);
    if (ctx === null) {
        throw new Error('Context is null!');
    }
    return ctx;
}
//# sourceMappingURL=index.js.map