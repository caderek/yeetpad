import { BrowsingHistory } from "../../../db/BrowsingHistory"
import { SearchHistory } from "../../../db/SearechHistory"
import { routeSearch } from "./routeSearch"

export async function handleUrlSearch() {
  const search = new URLSearchParams(location.search)
  const query = (search.get("q") ?? "").trim()

  if (!query) {
    return false
  }

  const route = await routeSearch(query)

  if (route.type === "redirect") {
    await BrowsingHistory.add(route.value)
    await SearchHistory.add(query)
    location.href = route.value.toString()
    return true
  }

  if (route.type === "inline") {
    // @todo Handle inline searches from omnibox
  }

  return true
}
