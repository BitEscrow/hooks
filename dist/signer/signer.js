import { useState } from 'react';
import { Seed } from '@cmdcode/signer';
import { EscrowSigner } from '@scrow/core';
export function initSigner(signer_store) {
    const { store, update, reset } = signer_store;
    const [signer, setSigner] = useState(null);
    const gen_words = Seed.generate.words;
    function has_session(pubkey) {
        const res = store.sessions.find(e => e[0] === pubkey);
        return Array.isArray(res) && typeof res[1] === 'string';
    }
    function get_session(pubkey) {
        const res = store.sessions.find(e => e[0] === pubkey);
        if (!Array.isArray(res) || typeof res[1] !== 'string') {
            throw new Error('session does not exist for pubkey: ' + pubkey);
        }
        return res[1];
    }
    const create_session = async (password, seed, xpub) => {
        const signer = EscrowSigner.create(store.config, seed, xpub);
        const pub = signer.pubkey;
        if (has_session(pub)) {
            throw new Error('session already exists: ' + pub);
        }
        const encrypted = signer.save(password);
        setSigner(signer);
        update({ sessions: [...store.sessions, [pub, encrypted]] });
        return signer;
    };
    const load_session = async (password, pubkey) => {
        if (!has_session(pubkey)) {
            throw new Error('session does not exist: ' + pubkey);
        }
        const payload = get_session(pubkey);
        const signer = EscrowSigner.load(store.config, password, payload);
        setSigner(signer);
        return signer;
    };
    const rem_session = (pubkey) => {
        const sessions = store.sessions.filter(e => e[0] !== pubkey);
        update({ sessions });
        return sessions;
    };
    const clear_sessions = () => {
        setSigner(null);
        reset();
    };
    const close_session = () => setSigner(null);
    const update_config = (config) => {
        if (signer !== null) {
            setSigner(new EscrowSigner({
                ...config,
                signer: signer._signer,
                wallet: signer._wallet
            }));
        }
        update({ config });
    };
    return {
        session: {
            clear: clear_sessions,
            close: close_session,
            create: create_session,
            list: store.sessions,
            load: load_session,
            remove: rem_session
        },
        gen_words,
        signer,
        update_config
    };
}
//# sourceMappingURL=signer.js.map