import { ClientConfig, EscrowClient } from '@scrow/core';
import { ReactElement } from 'react';
type Props = {
    children: ReactElement;
    config: ClientConfig;
};
export declare function ClientProvider({ children, config }: Props): ReactElement;
export declare function useClient(): EscrowClient;
export {};
//# sourceMappingURL=index.d.ts.map