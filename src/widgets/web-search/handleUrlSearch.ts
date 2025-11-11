import { getSerachUrl } from "./getSearchUrl"

export function handleUrlSearch() {
  const search = new URLSearchParams(location.search)
  const query = (search.get("q") ?? "").trim()

  if (query) {
    location.href = getSerachUrl.google_web(query)
  }
}
