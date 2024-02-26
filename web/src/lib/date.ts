import { now } from '@scrow/core/util'

export function convert_date (stamp : number) {
  const utc = Math.floor(stamp * 1000)
  return new Date(utc)
}

export function convert_timer (timer : number) {
  const stamp = now() + timer
  return convert_date(stamp)
}

export function parse_reltime (date : Date | null) {
  if (date === null) return 0
  const utc = Math.floor(date.valueOf() / 1000)
  return utc - now()
}
