export function ok(value, message) {
    if (value === false)
        throw new Error(message ?? 'Assertion failed!');
}
//# sourceMappingURL=assert.js.map