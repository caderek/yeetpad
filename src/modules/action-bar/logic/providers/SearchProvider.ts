import { loadFavicon } from "../../../../utils/favicons"
import type { IconSource } from "./interfaces"

function getSearchUrl(origin: string, search: string, phrase: string) {
  const searchPath = search.replace("%s", encodeURIComponent(phrase))

  return search.startsWith("http")
    ? searchPath
    : new URL(searchPath, origin).toString()
}

export class SearchProvider implements IconSource {
  #phrase: string
  #origin: string
  #search: string
  #domain?: string

  constructor(phrase: string, origin: string, search: string, name: string) {
    this.#phrase = phrase
    this.#origin = origin
    this.#search = search
    if (name) {
      this.#domain = name.split(":")[0]
    }
  }

  get phrase() {
    return this.#phrase
  }

  get url() {
    return getSearchUrl(this.#origin, this.#search, this.#phrase)
  }

  get domain() {
    return this.#domain
  }

  get icon() {
    return loadFavicon(this.domain).then((faviconUrl) => {
      return faviconUrl
        ? {
            img: faviconUrl,
            font: null,
          }
        : {
            img: null,
            font: "icon-search",
          }
    })
  }
}
