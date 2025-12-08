export type WebsiteInfo = {
  name: string
  origin: string
  search?: string
  affixes: string[]
}

export type IconData =
  | {
      img: string
      font: null
    }
  | {
      img: null
      font: string
    }

export interface IconSource {
  get icon(): Promise<IconData>
}
