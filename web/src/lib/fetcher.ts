type FetchArgs = [
  input : RequestInfo | URL,
  init ?: RequestInit | undefined
]

export async function fetcher (
  input : RequestInfo | URL | FetchArgs,
  init ?: RequestInit | undefined
) {

  if (Array.isArray(input)) {
    [ input, init ] = input
  }

  const res = await fetch(input, init)

  if (!res.ok) {
    try {
      const json = await res.json()
      console.log('json:', json)
      throw new Error(`${res.status}: ${json.error}`)
    } catch {
      console.log('json:', null)
      throw new Error(`${res.status}: ${res.statusText}`)
    }
  }
  
  return res.json()
}
