import { DepositData, DepositDataResponse, DepositListResponse, EscrowSigner } from '@scrow/core';
export declare function useDeposit(dpid: string, host?: string): {
    deposit: DepositData | undefined;
    data: DepositDataResponse | undefined;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<DepositDataResponse>;
    isValidating: boolean;
    isLoading: boolean;
};
export declare function useDepositList(signer: EscrowSigner): {
    deposits: DepositData[];
    data: DepositListResponse | undefined;
    error: any;
    mutate: import("swr/_internal").KeyedMutator<DepositListResponse>;
    isValidating: boolean;
    isLoading: boolean;
};
//# sourceMappingURL=index.d.ts.map