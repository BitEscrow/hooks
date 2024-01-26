export function ok (value : unknown, message ?: string) : asserts value {
  if (value === false) throw new Error(message ?? 'Assertion failed!')
}
