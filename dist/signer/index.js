import { jsx as _jsx } from "react/jsx-runtime";
import { initSigner } from './signer.js';
import { initStore } from './store.js';
import { createContext, useContext } from 'react';
const STORE_NAME = 'signers';
const defaults = {
    sessions: [],
    signer: null
};
export function createSignerStore(config) {
    const context = createContext(null);
    function SignerProvider({ children }) {
        const store = initStore(defaults, STORE_NAME);
        const ctx = initSigner(config, store);
        return (_jsx(context.Provider, { value: ctx, children: children }));
    }
    function useSigner() {
        const ctx = useContext(context);
        if (ctx === null) {
            throw new Error('Context is null!');
        }
        return ctx;
    }
    return { SignerProvider, useSigner };
}
//# sourceMappingURL=index.js.map