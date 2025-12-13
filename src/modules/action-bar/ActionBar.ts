import html from "./ActionBar.html?raw"
import css from "./ActionBar.css?raw"

import type { WebComponentLifecycle } from "../../common-types/web-components"

import { iconsStylesheet } from "../../reusable-components/common-stylesheets"
import { initializeStylesheet } from "../../utils/initializeStylesheet"
import { BrowsingHistory } from "../../db/BrowsingHistory"
import { SearchHistory } from "../../db/SearechHistory"
import { CommandHistory } from "../../db/CommandHistory"
import { EmptyProvider } from "./logic/providers/EmptyProvider"
import type { CalcProvider } from "./logic/providers/CalcProvider"
import type { CommandProvider } from "./logic/providers/CommandProvider"
import type { DirectProvider } from "./logic/providers/DirectProvider"
import type { MailProvider } from "./logic/providers/MailProvider"
import type { SearchProvider } from "./logic/providers/SearchProvider"
import { getProvider } from "./logic/getProvider"
import { executeQuery } from "./logic/executeQuery"
import type { IconData } from "./logic/providers/interfaces"

const stylesheet = initializeStylesheet(css)
const emptyProvider = new EmptyProvider()

export class ActionBar
  extends HTMLElement
  implements Partial<WebComponentLifecycle>
{
  #icon: HTMLElement | null = null
  #input: HTMLInputElement | null = null
  #reset: HTMLButtonElement | null = null
  #submit: HTMLButtonElement | null = null
  #provider:
    | EmptyProvider
    | CalcProvider
    | CommandProvider
    | DirectProvider
    | MailProvider
    | SearchProvider = emptyProvider

  constructor() {
    super()

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  connectedCallback(): void {
    const shadow = this.attachShadow({ mode: "open" })
    shadow.adoptedStyleSheets = [stylesheet, iconsStylesheet]
    shadow.innerHTML = html
    shadow.querySelector("input")?.focus()

    this.#icon = shadow.getElementById("bar-icon")
    this.#input = shadow.querySelector("input")
    this.#reset = shadow.querySelector('button[type="reset"]')
    this.#submit = shadow.querySelector('button[type="submit"]')

    this.#registerHandlers()
  }

  async handleInput(e: Event) {
    const target = e.currentTarget as HTMLInputElement
    this.#provider = await getProvider(target.value)

    this.#updateIcon(await this.#provider.icon)
  }

  async handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const target = e.currentTarget as HTMLFormElement
    const formData = new FormData(target)

    const query = (formData.get("action-phrase") ?? "") as string
    this.#provider = await getProvider(query)

    if (this.#provider instanceof EmptyProvider) {
      return
    }

    const result = await executeQuery(this.#provider)

    // if (result.type === "direct") {
    //   await BrowsingHistory.add(result.value)
    //   this.handleReset()
    //   location.href = result.value.toString()
    //   return
    // }

    if (result.type === "redirect") {
      await BrowsingHistory.add(result.value)
      await SearchHistory.add(query)
      this.handleReset()
      location.href = result.value.toString()
      return
    }

    if (result.type === "command") {
      await CommandHistory.add(query.slice(1).trim())
      this.handleReset()
      return
    }

    if (result.type === "inline") {
      this.#input!.value = result.value
    }
  }

  handleReset() {
    this.#provider = emptyProvider
    this.#input!.value = ""
    this.#updateIcon({
      img: null,
      font: "icon-search",
    })
    this.#input!.focus()
  }

  async #updateIcon(icon: IconData) {
    if (!this.#icon || !this.#reset || !this.#submit) {
      return
    }

    this.#icon.className = icon.font ?? ""
    this.#icon.style.setProperty(
      "--icon",
      icon.img ? `url(${icon.img})` : "none",
    )

    console.log(this.#provider)

    this.#reset.disabled = this.#provider instanceof EmptyProvider
    this.#submit.disabled = this.#provider instanceof EmptyProvider
  }

  #registerHandlers() {
    this.#input?.addEventListener("input", this.handleInput)

    this.shadowRoot!.querySelector("form")!.addEventListener(
      "submit",
      this.handleSubmit,
    )

    this.shadowRoot!.querySelector('button[type="reset"]')?.addEventListener(
      "click",
      this.handleReset,
    )

    this.#input?.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.handleReset()
      }
    })
  }
}
