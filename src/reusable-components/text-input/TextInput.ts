import type { WebComponentLifecycle } from "../../common-types/web-components"

export class TextInput
  extends HTMLElement
  implements Partial<WebComponentLifecycle>
{
  constructor() {
    super()
  }

  connectedCallback(): void {
    const shadow = this.attachShadow({ mode: "open" })
    shadow.innerHTML = `<style>
      .display {
        box-sizing: border-box;
        display: inline-block;
        padding: var(--space-m);
        font-size: var(--font-m);
        height: calc(var(--font-m) + 2 * var(--space-m));

        background: red;
    </style>
    <div><span class="display"></span><input type="text"/></div>`

    const input = shadow.querySelector("input")
    const display = shadow.querySelector(".display")
    input?.focus()

    input?.addEventListener("input", (e) => {
      const target = e.currentTarget as HTMLInputElement
      console.log(target.value)
      display!.innerHTML = [...target.value]
        .map((x) => `<span>${x}</span>`)
        .join("")
    })
  }
}
