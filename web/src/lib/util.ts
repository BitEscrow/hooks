import { Buff } from '@cmdcode/buff'

export function random (size = 8) {
  return Buff.random(size).b64url
}

export function shorten_str (
  str : string, 
  max : number = 15
) {
  return (str.length > max)
    ? str.slice(0, 6) + '...' + str.slice(-6)
    : str
}

export function convert_regex (
  str  : string | undefined, 
  data : string[]
) {
  if (str === undefined || str === '') return undefined
  if (str === '*') return data
  if (str.includes('|')) return str.split('|')
  return [ str ]
}

export function parse_regex (
  list : string[],
  data : string[]
) {
  if (list.sort().toString() === data.sort().toString()) {
    return '*'
  }

  if (list.length > 1) {
    return list.join('|')
  }

  if (list.length === 1) {
    return list[0]
  }

  return undefined
}