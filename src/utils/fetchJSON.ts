import type { JSONValue } from "./utilityTypes"

type RequestData = {
  body: JSONValue
  config: RequestInit
}

// @todo Add better error handling
export async function fetchJSON<ResultType>(
  url: string | URL,
  data: Partial<RequestData> = {},
) {
  const info: RequestInit = data.config ?? {}

  if (data.body) {
    info.method = "POST"
    info.headers = {
      ...info.headers,
      "Content-Type": "application/json",
    }
    info.body = JSON.stringify(data.body)
  }

  const res = await fetch(url, info)

  if (!res.ok) {
    return null
  }

  return res.json() as ResultType
}
