import type { IconSource } from "./interfaces"

export class MailProvider implements IconSource {
  #address: string

  constructor(address: string) {
    this.#address = address
  }

  get address() {
    return this.#address
  }

  get url() {
    return `mailto:${this.#address}`
  }

  get icon() {
    return Promise.resolve({
      img: null,
      font: "icon-mail",
    })
  }
}
