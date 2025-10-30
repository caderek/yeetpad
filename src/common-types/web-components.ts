export interface WebComponentLifecycle {
  connectedCallback(): void
  disconnectedCallback(): void
  connectedMoveCallback(): void
  adoptedCallback(): void
  attributeChangedCallback(name: string, oldValue: string | undefined, newValue: string| undefined): void
}

