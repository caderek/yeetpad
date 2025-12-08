import type { IconSource } from "./interfaces"

export class CommandProvider implements IconSource {
  #command: string

  constructor(command: string) {
    this.#command = command
  }

  get command() {
    return this.#command
  }

  get icon() {
    return Promise.resolve({
      img: null,
      font: "icon-flash",
    })
  }
}
