import html from "./ActionBar.html?raw"
import css from "./ActionBar.css?raw"

import type { WebComponentLifecycle } from "../../common-types/web-components"

import { routeSearch } from "./logic/routeSearch"
import { iconsStylesheet } from "../../reusable-components/common-stylesheets"
import { initializeStylesheet } from "../../utils/initializeStylesheet"
import { getBarIcon } from "./logic/getBarIcon"

const stylesheet = initializeStylesheet(css)

export class ActionBar
  extends HTMLElement
  implements Partial<WebComponentLifecycle>
{
  #icon: HTMLElement | null = null
  #input: HTMLInputElement | null = null

  constructor() {
    super()

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  connectedCallback(): void {
    const shadow = this.attachShadow({ mode: "open" })
    shadow.adoptedStyleSheets = [stylesheet, iconsStylesheet]
    shadow.innerHTML = html
    shadow.querySelector("input")?.focus()
    this.#registerHandlers()

    this.#icon = shadow.getElementById("bar-icon")
    this.#input = shadow.querySelector("input")
  }

  handleInput(e: Event) {
    const target = e.currentTarget as HTMLInputElement

    this.#updateIcon(target.value.trim())
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const target = e.currentTarget as HTMLFormElement
    const formData = new FormData(target)

    const query = ((formData.get("action-phrase") ?? "") as string).trim()

    const route = await routeSearch(query)

    if (route.type === "redirect") {
      this.#input!.value = ""
      location.href = route.value
      return
    }

    if (route.type === "inline") {
      this.#input!.value = route.value
    }
  }

  #updateIcon(query: string) {
    if (!this.#icon) {
      return
    }

    this.#icon.className = getBarIcon(query)
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
