import { loadFavicon } from "../../../../utils/favicons"
import { getDomain } from "../../../../utils/url"
import type { IconSource } from "./interfaces"

export class DirectProvider implements IconSource {
  #url: URL
  #domain: string | null = null

  constructor(directUrl: URL, name?: string) {
    this.#url = directUrl
    if (name) {
      this.#domain = name.split(":")[0]
    }
  }

  get url() {
    return this.#url.toString()
  }

  get domain() {
    return this.#domain ?? getDomain(this.#url)
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
            font: "icon-web",
          }
    })
  }
}
