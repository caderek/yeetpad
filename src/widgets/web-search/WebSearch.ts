import html from "./WebSearch.html?raw"
import css from "./WebSearch.css?raw"

import type { WebComponentLifecycle } from "../../common-types/web-components"

import {
  getGoogleWebSearchURL,
  getGoogleAISearchURL,
  getGoogleDefaultSearchURL,
} from "./providers/google"
import { getRedditSearchURL } from "./providers/reddit"
import { getCHatGPTSearchURL } from "./providers/chatgpt"

const getSerachUrl = {
  google: getGoogleDefaultSearchURL,
  google_web: getGoogleWebSearchURL,
  google_ai: getGoogleAISearchURL,
  reddit: getRedditSearchURL,
  chatgpt: getCHatGPTSearchURL,
}

class WebSearch extends HTMLElement implements Partial<WebComponentLifecycle> {
  constructor() {
    super()

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  connectedCallback(): void {
    const shadow = this.attachShadow({ mode: "open" })
    shadow.innerHTML = `<style>${css}</style>${html}`
    shadow.querySelector("input")?.focus()
    this.#registerHandlers()
  }

  handleInput(e: Event) {
    const target = e.currentTarget as HTMLInputElement
    console.log(target.value)
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const target = e.currentTarget as HTMLFormElement
    const formData = new FormData(target)

    const searchPhrase = ((formData.get("web-search") ?? "") as string).trim()
    location.href = getSerachUrl.google_web(searchPhrase)
  }

  #registerHandlers() {
    this.shadowRoot!.querySelector("input")!.addEventListener(
      "input",
      this.handleInput,
    )

    this.shadowRoot!.querySelector("form")!.addEventListener(
      "submit",
      this.handleSubmit,
    )
  }
}

customElements.define("web-search", WebSearch)
