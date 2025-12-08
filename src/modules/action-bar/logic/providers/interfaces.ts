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
