import { initStore } from './store.js';
import { SignerStore } from './types.js';
import { ClientConfig, EscrowSigner } from '@scrow/core';
type StoreAPI = ReturnType<typeof initStore<SignerStore>>;
export declare function initSigner(config: ClientConfig, reducer: StoreAPI): {
    session: {
        clear: () => void;
        close: () => void;
        create: (password: string, seed: string, xpub?: string) => Promise<EscrowSigner>;
        list: [string, string][];
        load: (password: string, pubkey: string) => Promise<EscrowSigner>;
        remove: (pubkey: string) => [string, string][];
    };
    gen_words: typeof import("@cmdcode/signer").gen_seed_words;
    signer: EscrowSigner | null;
};
export {};
//# sourceMappingURL=signer.d.ts.map