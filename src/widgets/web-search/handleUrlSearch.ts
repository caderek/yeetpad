import { getSerachUrl } from "./getSearchUrl"

export function handleUrlSearch() {
  const search = new URLSearchParams(location.search)
  const query = (search.get("q") ?? "").trim()

  if (!query) {
    return
  }

  if (query.endsWith("?")) {
    location.href = getSerachUrl.chatgpt(query)
    return
  }

  location.href = getSerachUrl.google_web(query)
}
