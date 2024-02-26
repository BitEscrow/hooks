import { assert } from '@scrow/core';
import useSWR from 'swr';
export function useContract(client, cid) {
    const host = client.host;
    const url = `${host}/api/contract/${cid}`;
    const fetcher = async () => {
        assert.is_hash(cid);
        const res = await client.contract.read(cid);
        if (!res.ok)
            throw new Error(res.error);
        return res.data;
    };
    const res = useSWR(url, fetcher);
    let data;
    if (res.data !== undefined) {
        data = res.data.contract;
    }
    return { ...res, data };
}
export function useContractList(signer) {
    const client = signer.client;
    const pub = signer.pubkey;
    const url = `${client.host}/api/contract/list?pk=${pub}`;
    const fetcher = async () => {
        const token = signer.request.contracts();
        const res = await client.contract.list(pub, token);
        if (!res.ok)
            throw new Error(res.error);
        return res.data;
    };
    const res = useSWR(url, fetcher);
    let data = [];
    if (res.data !== undefined) {
        data = res.data.contracts;
    }
    return { ...res, data };
}
//# sourceMappingURL=index.js.map