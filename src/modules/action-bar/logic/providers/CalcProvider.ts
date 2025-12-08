import { fetchJSON } from "../../../../utils/fetchJSON"
import { baseProviders } from "./base"
import type { IconSource } from "./interfaces"
import { SearchProvider } from "./SearchProvider"

export class CalcProvider implements IconSource {
  #expression: string

  constructor(expression: string) {
    this.#expression = expression
  }

  async execute() {
    const apiResult = await this.#apiExecute()

    if (apiResult) {
      return apiResult
    }

    const websiteInfo = baseProviders["wolframalpha.com"]

    return new SearchProvider(
      this.#expression,
      websiteInfo.origin,
      websiteInfo.search!,
    )
  }

  async #apiExecute() {
    const answer = await fetchJSON<{
      result: string | null
      error: string | null
    }>("https://api.mathjs.org/v4/", { body: { expr: this.#expression } })

    return answer?.result ?? null
  }

  get expression() {
    return this.#expression
  }

  get icon() {
    return Promise.resolve({
      img: null,
      font: "icon-calc",
    })
  }
}
