import { assert } from '@scrow/core';
import useSWR from 'swr';
const DEFAULT_HOST = 'http://localhost:3000';
export function useDeposit(dpid, host = DEFAULT_HOST) {
    assert.is_hash(dpid);
    const url = `${host}/api/deposit/${dpid}`;
    const res = useSWR(url);
    let deposit;
    if (res.data !== undefined) {
        deposit = res.data.deposit;
    }
    return { ...res, deposit };
}
export function useDepositList(signer) {
    const client = signer.client;
    const pub = signer.pubkey;
    const url = `${client.host}/api/deposit/list?pk=${pub}`;
    const fetcher = async () => {
        const pub = signer.pubkey;
        const token = signer.request.deposit_list();
        const res = await client.deposit.list(pub, token);
        if (!res.ok)
            throw new Error(res.error);
        return res.data;
    };
    const res = useSWR(url, fetcher);
    let data = [];
    if (res.data !== undefined) {
        data = res.data.deposits;
    }
    return { ...res, data };
}
//# sourceMappingURL=index.js.map