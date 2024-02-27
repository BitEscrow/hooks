import { ClientConfig } from '@scrow/core';
import { initSigner } from './signer.js';
import { ReactElement } from 'react';
type Props = {
    config: ClientConfig;
    children: ReactElement;
};
type Store = ReturnType<typeof initSigner>;
export declare function createSignerStore(): {
    SignerProvider: ({ config, children }: Props) => ReactElement;
    useSigner: () => Store;
};
export {};
//# sourceMappingURL=index.d.ts.map