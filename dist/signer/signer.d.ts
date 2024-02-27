import { ClientConfig, EscrowSigner } from '@scrow/core';
import { initStore } from './store.js';
import { SignerStore } from './types.js';
type StoreAPI = ReturnType<typeof initStore<SignerStore>>;
export declare function initSigner(signer_store: StoreAPI): {
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
    update_config: (config: ClientConfig) => void;
};
export {};
//# sourceMappingURL=signer.d.ts.map