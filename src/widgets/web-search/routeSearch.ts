import { getSerachUrl } from "./getSearchUrl"

export function routeSearch(query: string) {
  query = query.trim()
  const lastChar = query.at(-1)
  const queryWithoutlastChar = query.slice(0, -1)

  switch (lastChar) {
    case "?":
      return getSerachUrl.chatgpt(query)
    case ">":
      return getSerachUrl.youtube(queryWithoutlastChar)
    case "!":
      return getSerachUrl.reddit(queryWithoutlastChar)
    default:
      return getSerachUrl.google_web(query)
  }
}
