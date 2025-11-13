import { routeSearch } from "./routeSearch"

export function handleUrlSearch() {
  const search = new URLSearchParams(location.search)
  const query = (search.get("q") ?? "").trim()

  if (!query) {
    return false
  }

  location.href = routeSearch(query)

  return true
}
