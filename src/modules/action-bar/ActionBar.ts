import html from "./ActionBar.html?raw"
import css from "./ActionBar.css?raw"

import type { WebComponentLifecycle } from "../../common-types/web-components"

import { routeSearch } from "./logic/routeSearch"
import { iconsStylesheet } from "../../reusable-components/common-stylesheets"
import { initializeStylesheet } from "../../utils/initializeStylesheet"

export class ActionBar
  extends HTMLElement
  implements Partial<WebComponentLifecycle>
{
  constructor() {
    super()

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  connectedCallback(): void {
    const shadow = this.attachShadow({ mode: "open" })
    const stylesheet = initializeStylesheet(css)
    shadow.adoptedStyleSheets = [stylesheet, iconsStylesheet]
    shadow.innerHTML = html
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

    const query = ((formData.get("action-phrase") ?? "") as string).trim()
    location.href = routeSearch(query)
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
