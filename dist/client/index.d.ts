import { ClientConfig, EscrowClient } from '@scrow/core';
import { ReactElement } from 'react';
type Props = {
    children: ReactElement;
    config: ClientConfig;
};
type ClientStore = {
    client: EscrowClient;
    update_config: (config: ClientConfig) => void;
};
export declare function ClientProvider({ children, config }: Props): ReactElement;
export declare function useClient(): ClientStore;
export {};
//# sourceMappingURL=index.d.ts.map