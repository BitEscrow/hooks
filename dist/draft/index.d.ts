import { DraftItem, EscrowSigner } from '@scrow/core';
export declare function useDraftList(relay: string, signer: EscrowSigner): {
    data: DraftItem[];
    error: any;
    mutate: import("swr/_internal").KeyedMutator<DraftItem[]>;
    isValidating: boolean;
    isLoading: boolean;
};
//# sourceMappingURL=index.d.ts.map