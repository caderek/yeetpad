import { routeSearch } from "./routeSearch"

export async function handleUrlSearch() {
  const search = new URLSearchParams(location.search)
  const query = (search.get("q") ?? "").trim()

  if (!query) {
    return false
  }

  const route = await routeSearch(query)

  if (route.type === "redirect") {
    location.href = route.value
    return true
  }

  if (route.type === "inline") {
    // @todo Handle inline searches from omnibox
  }

  return true
}
