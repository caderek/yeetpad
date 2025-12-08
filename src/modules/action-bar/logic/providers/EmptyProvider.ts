import type { IconSource } from "./interfaces"

export class EmptyProvider implements IconSource {
  get icon() {
    return Promise.resolve({
      img: null,
      font: "icon-search",
    })
  }
}
