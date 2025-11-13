import { getSerachUrl } from "./getSearchUrl"

export function routeSearch(query: string) {
  query = query.trim()

  if (query.endsWith("?")) {
    return getSerachUrl.chatgpt(query.slice(0, -1))
  }

  if (query.endsWith(">>")) {
    return getSerachUrl.boredflix(query.slice(0, -2))
  }

  if (query.endsWith(">")) {
    return getSerachUrl.youtube(query.slice(0, -1))
  }

  if (query.endsWith("!")) {
    return getSerachUrl.reddit(query.slice(0, -1))
  }

  return getSerachUrl.google_web(query)
}
