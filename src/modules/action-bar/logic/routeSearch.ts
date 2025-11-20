import { getDirectUrl } from "./getDirectUrl"
import { getSerachUrl } from "./getSearchUrl"
import { isEmail } from "./isEmail"

export function routeSearch(query: string) {
  query = query.trim()

  if (isEmail(query)) {
    return `mailto:${query}`
  }

  const directUrl = getDirectUrl(query)

  if (directUrl) {
    return directUrl
  }

  if (query.endsWith("??")) {
    return getSerachUrl.wikipedia(query.slice(0, -2))
  }

  if (query.endsWith(" wiki")) {
    return getSerachUrl.wikipedia(query.slice(0, -5))
  }

  if (query.endsWith("?")) {
    return getSerachUrl.google_ai(query.slice(0, -1))
  }

  if (query.endsWith(">>")) {
    return getSerachUrl.boredflix(query.slice(0, -2))
  }

  if (query.endsWith(">")) {
    return getSerachUrl.youtube(query.slice(0, -1))
  }

  if (query.endsWith(" youtube")) {
    return getSerachUrl.youtube(query.slice(0, -8))
  }

  if (query.endsWith(" bing")) {
    return getSerachUrl.bing(query.slice(0, -5))
  }

  if (query.endsWith(" spotify")) {
    return getSerachUrl.spotify(query.slice(0, -8))
  }

  if (query.endsWith(" goodreads")) {
    return getSerachUrl.goodreads(query.slice(0, -10))
  }

  if (query.endsWith(" github")) {
    return getSerachUrl.github(query.slice(0, -7))
  }

  if (query.endsWith(" npm")) {
    return getSerachUrl.npm(query.slice(0, -4))
  }

  if (query.endsWith("!")) {
    return getSerachUrl.reddit(query.slice(0, -1))
  }

  if (query.endsWith(" amazon")) {
    return getSerachUrl.amazon(query.slice(0, -7))
  }

  if (query.endsWith(" ebay")) {
    return getSerachUrl.ebay(query.slice(0, -5))
  }

  if (query.endsWith(" etsy")) {
    return getSerachUrl.etsy(query.slice(0, -5))
  }

  if (query.endsWith(" twitter")) {
    return getSerachUrl.twitter(query.slice(0, -8))
  }

  if (query.endsWith(" ecosia")) {
    return getSerachUrl.ecosia(query.slice(0, -7))
  }

  if (query.endsWith(" yandex")) {
    return getSerachUrl.yandex(query.slice(0, -7))
  }

  if (query.endsWith(" searx")) {
    return getSerachUrl.searx(query.slice(0, -6))
  }

  if (query.endsWith(" qwant")) {
    return getSerachUrl.qwant(query.slice(0, -6))
  }

  if (query.endsWith(" mojeek")) {
    return getSerachUrl.mojeek(query.slice(0, -7))
  }

  if (query.endsWith(" kagi")) {
    return getSerachUrl.kagi(query.slice(0, -5))
  }

  if (query.endsWith(" marginalia")) {
    return getSerachUrl.mariginalia(query.slice(0, -11))
  }

  if (query.endsWith(" google")) {
    return getSerachUrl.google(query.slice(0, -7))
  }

  if (query.endsWith(" google web")) {
    return getSerachUrl.google_web(query.slice(0, -11))
  }

  if (query.endsWith(" google ai")) {
    return getSerachUrl.google_ai(query.slice(0, -10))
  }

  if (query.endsWith(" gpt")) {
    return getSerachUrl.chatgpt(query.slice(0, -4))
  }

  if (query.endsWith(" duckduckgo")) {
    return getSerachUrl.duckduckgo(query.slice(0, -11))
  }

  if (query.endsWith(" entertrained")) {
    return getSerachUrl.entertrained(query.slice(0, -13))
  }

  if (query.endsWith("@")) {
    return getSerachUrl.gmail(query.slice(0, -1))
  }

  return getSerachUrl.startpage(query)
}
