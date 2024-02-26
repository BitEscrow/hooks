import { ContractData, ContractDataResponse, ContractListResponse, EscrowClient, EscrowSigner } from '@scrow/core';
export declare function useContract(client: EscrowClient, cid: string): {
    data: ContractData | undefined;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<ContractDataResponse>;
    isValidating: boolean;
    isLoading: boolean;
};
export declare function useContractList(signer: EscrowSigner): {
    data: ContractData[];
    error: any;
    mutate: import("swr/_internal").KeyedMutator<ContractListResponse>;
    isValidating: boolean;
    isLoading: boolean;
};
//# sourceMappingURL=index.d.ts.map