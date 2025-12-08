import { BrowsingHistory } from "../../../db/BrowsingHistory"
import { SearchHistory } from "../../../db/SearechHistory"
import { executeQuery } from "./executeQuery"
import { getProvider } from "./getProvider"
import { EmptyProvider } from "./providers/EmptyProvider"

export async function handleUrlSearch() {
  const search = new URLSearchParams(location.search)
  const query = search.get("q") ?? ""
  const provider = await getProvider(query)

  if (provider instanceof EmptyProvider) {
    return false
  }

  const result = await executeQuery(provider)

  if (result.type === "redirect") {
    await BrowsingHistory.add(result.value)
    await SearchHistory.add(query)
    location.href = result.value.toString()
    return true
  }

  if (result.type === "inline") {
    // @todo Handle inline searches from omnibox
  }

  return true
}
