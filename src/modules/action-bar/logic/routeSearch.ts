import type { Provider } from "./actionBarTypes"
import { affixToProvider } from "./affixes"
import { calculate } from "./calculate"
import { getDirectUrl } from "./getDirectUrl"
import { isEmail } from "./isEmail"
import { baseProviders } from "./providers/base"

console.log(affixToProvider)

function getSearchUrl(provider: Provider, query: string) {
  if (provider.search) {
    const searchPath = provider.search.replace("%s", encodeURIComponent(query))

    return provider.search.startsWith("http")
      ? searchPath
      : new URL(searchPath, provider.origin).toString()
  }

  return ""
}

export type Route =
  | {
      type: "direct"
      value: string
    }
  | {
      type: "redirect"
      value: string | URL
    }
  | {
      type: "inline"
      value: string
    }
  | {
      type: "command"
      value: Promise<boolean> // temp for testing, it shoudl be a command result
    }

export async function routeSearch(query: string): Promise<Route> {
  query = query.trim()

  if (query.startsWith("/")) {
    return {
      type: "command",
      value: Promise.resolve(true),
    }
  }

  if (isEmail(query)) {
    return { type: "redirect", value: `mailto:${query}` }
  }

  if (query.startsWith("=")) {
    const expr = query.slice(1).trim()
    const result = await calculate(expr)

    if (result) {
      return {
        type: "inline",
        value: `=${result}`,
      }
    }

    const provider = baseProviders["wolframalpha.com"]

    return {
      type: "redirect",
      value: getSearchUrl(provider, expr),
    }
  }

  const directUrl = getDirectUrl(query)

  if (directUrl) {
    return {
      type: "direct",
      value: directUrl,
    }
  }

  if (query.endsWith("??")) {
    const provider = baseProviders["wikipedia.org"]
    return {
      type: "redirect",
      value: getSearchUrl(provider, query.slice(0, -2)),
    }
  }

  if (query.endsWith("?")) {
    const provider = baseProviders["google.com:ai"]
    return {
      type: "redirect",
      value: getSearchUrl(provider, query.slice(0, -1)),
    }
  }

  if (query.endsWith(">")) {
    const provider = baseProviders["youtube.com"]
    return {
      type: "redirect",
      value: getSearchUrl(provider, query.slice(0, -1)),
    }
  }

  const chunks = query.split(/\s+/)
  const first = chunks[0]
  const last = chunks.at(-1)

  for (const [affix, providerName] of Object.entries(affixToProvider)) {
    if (last === affix) {
      const provider = baseProviders[providerName]
      return {
        type: "redirect",
        value:
          chunks.length === 1
            ? provider.origin
            : getSearchUrl(provider, chunks.slice(0, -1).join(" ")),
      }
    }

    if (first === affix) {
      const provider = baseProviders[providerName]
      return {
        type: "redirect",
        value:
          chunks.length === 1
            ? provider.origin
            : getSearchUrl(provider, chunks.slice(1).join(" ")),
      }
    }
  }

  const provider = baseProviders["startpage.com"]

  return {
    type: "redirect",
    value: getSearchUrl(provider, query),
  }
}
