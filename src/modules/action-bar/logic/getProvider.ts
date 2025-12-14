import { affixToProvider } from "./affixes"
import { getDirectUrl } from "./getDirectUrl"
import { isEmail } from "./isEmail"
import { baseProviders } from "./providers/base"
import { CalcProvider } from "./providers/CalcProvider"
import { CommandProvider } from "./providers/CommandProvider"
import { DefaultProvider } from "./providers/DefaultProvider"
import { DirectProvider } from "./providers/DirectProvider"
import { EmptyProvider } from "./providers/EmptyProvider"
import { MailProvider } from "./providers/MailProvider"
import { SearchProvider } from "./providers/SearchProvider"

export async function getProvider(query: string) {
  const q = query.trim()

  if (!q) {
    return new EmptyProvider()
  }

  if (q.startsWith("/")) {
    return new CommandProvider(q.slice(1).trim())
  }

  if (query.endsWith(".")) {
    const defaultSearchEngine = baseProviders["startpage.com"]

    return new DefaultProvider(
      q.slice(0, -1).trim(),
      defaultSearchEngine.origin,
      defaultSearchEngine.search!,
      "",
    )
  }

  if (q.startsWith("=")) {
    return new CalcProvider(q.slice(1).trim())
  }

  if (q.endsWith("=")) {
    return new CalcProvider(q.slice(0, -1).trim())
  }

  if (q.endsWith("?")) {
    const defaultAiChatbox = baseProviders["perplexity.ai"]

    return new SearchProvider(
      q.slice(0, -1).trim(),
      defaultAiChatbox.origin,
      defaultAiChatbox.search!,
      "perplexity.ai",
    )
  }

  if (isEmail(q)) {
    return new MailProvider(q)
  }

  const directUrl = getDirectUrl(q)

  if (directUrl) {
    return new DirectProvider(directUrl)
  }

  const chunks = q.split(/\s+/)

  if (chunks.length === 1) {
    const match = affixToProvider[chunks[0]]

    if (match) {
      const websiteInfo = baseProviders[match]
      return new DirectProvider(new URL(websiteInfo.origin), match)
    }
  } else {
    const lastMatch = affixToProvider[chunks.at(-1) as string]

    if (lastMatch) {
      const websiteInfo = baseProviders[lastMatch]

      if (websiteInfo.search) {
        return new SearchProvider(
          chunks.slice(0, -1).join(" "),
          websiteInfo.origin,
          websiteInfo.search,
          lastMatch,
        )
      }
    }

    const firstMatch = affixToProvider[chunks[0]]

    if (firstMatch) {
      const websiteInfo = baseProviders[firstMatch]

      if (websiteInfo.search) {
        return new SearchProvider(
          chunks.slice(1).join(" "),
          websiteInfo.origin,
          websiteInfo.search,
          firstMatch,
        )
      }
    }
  }

  const defaultSearchEngine = baseProviders["startpage.com"]

  return new DefaultProvider(
    q,
    defaultSearchEngine.origin,
    defaultSearchEngine.search!,
    "",
  )
}
