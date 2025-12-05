export type Provider = {
  origin: string
  search?: string
  affixes?: string[]
}

export type Providers = { [key: string]: Provider }

export type ProviderCategory =
  | "ai"
  | "email"
  | "general"
  | "knowledge"
  | "media"
  | "shopping"
  | "social"
