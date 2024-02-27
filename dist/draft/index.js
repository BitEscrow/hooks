import useSWR from 'swr';
import { DraftSession } from '@scrow/core';
export function useDraftList(relay, signer) {
    const client = signer.client;
    const pub = signer.pubkey;
    const url = `${client.host}/drafts/list?pk=${pub}`;
    const fetcher = async () => {
        const session = new DraftSession(signer);
        const data = await session.list(relay);
        return data;
    };
    const res = useSWR(url, fetcher);
    const data = res.data ?? [];
    return { ...res, data };
}
//# sourceMappingURL=index.js.map