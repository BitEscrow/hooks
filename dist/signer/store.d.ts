export type Action<T> = {
    type: 'reset';
    payload: T;
} | {
    type: 'update';
    payload: Partial<T>;
};
export declare function initStore<T>(defaults: T, session_key?: string): {
    reset: (store?: Partial<T>) => void;
    store: T;
    update: (store: Partial<T>) => void;
};
//# sourceMappingURL=store.d.ts.map