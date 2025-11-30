import { calculate } from "./calculate"
import { getDirectUrl } from "./getDirectUrl"
import { getSearchUrl } from "./getSearchUrl"
import { isEmail } from "./isEmail"

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

    return {
      type: "redirect",
      value: getSearchUrl.wolframalpha(expr),
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
    return {
      type: "redirect",
      value: getSearchUrl.wikipedia(query.slice(0, -2)),
    }
  }

  if (query.endsWith(" wiki")) {
    return {
      type: "redirect",
      value: getSearchUrl.wikipedia(query.slice(0, -5)),
    }
  }

  if (query.endsWith("?")) {
    return {
      type: "redirect",
      value: getSearchUrl.google_ai(query.slice(0, -1)),
    }
  }

  if (query.endsWith(">>")) {
    return {
      type: "redirect",
      value: getSearchUrl.boredflix(query.slice(0, -2)),
    }
  }

  if (query.endsWith(">")) {
    return {
      type: "redirect",
      value: getSearchUrl.youtube(query.slice(0, -1)),
    }
  }

  if (query.endsWith(" youtube")) {
    return {
      type: "redirect",
      value: getSearchUrl.youtube(query.slice(0, -8)),
    }
  }

  if (query.endsWith(" bing")) {
    return {
      type: "redirect",
      value: getSearchUrl.bing(query.slice(0, -5)),
    }
  }

  if (query.endsWith(" spotify")) {
    return {
      type: "redirect",
      value: getSearchUrl.spotify(query.slice(0, -8)),
    }
  }

  if (query.endsWith(" goodreads")) {
    return {
      type: "redirect",
      value: getSearchUrl.goodreads(query.slice(0, -10)),
    }
  }

  if (query.endsWith(" github")) {
    return {
      type: "redirect",
      value: getSearchUrl.github(query.slice(0, -7)),
    }
  }

  if (query.endsWith(" npm")) {
    return {
      type: "redirect",
      value: getSearchUrl.npm(query.slice(0, -4)),
    }
  }

  if (query.endsWith("!")) {
    return {
      type: "redirect",
      value: getSearchUrl.reddit(query.slice(0, -1)),
    }
  }

  if (query.endsWith(" amazon")) {
    return {
      type: "redirect",
      value: getSearchUrl.amazon(query.slice(0, -7)),
    }
  }

  if (query.endsWith(" ebay")) {
    return {
      type: "redirect",
      value: getSearchUrl.ebay(query.slice(0, -5)),
    }
  }

  if (query.endsWith(" etsy")) {
    return {
      type: "redirect",
      value: getSearchUrl.etsy(query.slice(0, -5)),
    }
  }

  if (query.endsWith(" twitter")) {
    return {
      type: "redirect",
      value: getSearchUrl.twitter(query.slice(0, -8)),
    }
  }

  if (query.endsWith(" ecosia")) {
    return {
      type: "redirect",
      value: getSearchUrl.ecosia(query.slice(0, -7)),
    }
  }

  if (query.endsWith(" yandex")) {
    return {
      type: "redirect",
      value: getSearchUrl.yandex(query.slice(0, -7)),
    }
  }

  if (query.endsWith(" searx")) {
    return {
      type: "redirect",
      value: getSearchUrl.searx(query.slice(0, -6)),
    }
  }

  if (query.endsWith(" qwant")) {
    return {
      type: "redirect",
      value: getSearchUrl.qwant(query.slice(0, -6)),
    }
  }

  if (query.endsWith(" mojeek")) {
    return {
      type: "redirect",
      value: getSearchUrl.mojeek(query.slice(0, -7)),
    }
  }

  if (query.endsWith(" kagi")) {
    return {
      type: "redirect",
      value: getSearchUrl.kagi(query.slice(0, -5)),
    }
  }

  if (query.endsWith(" marginalia")) {
    return {
      type: "redirect",
      value: getSearchUrl.mariginalia(query.slice(0, -11)),
    }
  }

  if (query.endsWith(" google")) {
    return {
      type: "redirect",
      value: getSearchUrl.google(query.slice(0, -7)),
    }
  }

  if (query.endsWith(" google web")) {
    return {
      type: "redirect",
      value: getSearchUrl.google_web(query.slice(0, -11)),
    }
  }

  if (query.endsWith(" google ai")) {
    return {
      type: "redirect",
      value: getSearchUrl.google_ai(query.slice(0, -10)),
    }
  }

  if (query.endsWith(" gpt")) {
    return {
      type: "redirect",
      value: getSearchUrl.chatgpt(query.slice(0, -4)),
    }
  }

  if (query.endsWith(" duckduckgo")) {
    return {
      type: "redirect",
      value: getSearchUrl.duckduckgo(query.slice(0, -11)),
    }
  }

  if (query.endsWith(" entertrained")) {
    return {
      type: "redirect",
      value: getSearchUrl.entertrained(query.slice(0, -13)),
    }
  }

  if (query.endsWith(" wolfram")) {
    return {
      type: "redirect",
      value: getSearchUrl.wolframalpha(query.slice(0, -8)),
    }
  }

  if (query.endsWith("gmail")) {
    return {
      type: "redirect",
      value: getSearchUrl.gmail(query.slice(0, -5)),
    }
  }

  if (query.endsWith(" so")) {
    return {
      type: "redirect",
      value: getSearchUrl.stackoverflow(query.slice(0, -3)),
    }
  }

  if (query.endsWith(" lucida")) {
    return {
      type: "redirect",
      value: getSearchUrl.lucida(query.slice(0, -7)),
    }
  }

  return {
    type: "redirect",
    value: getSearchUrl.startpage(query),
  }
}
