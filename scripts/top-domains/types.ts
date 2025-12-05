type IconObject = {
  src: string
  sizes?: string
  type?: string
  purpose?: string
}

type ShortcutObject = {
  name: string
  url: string
  description?: string
  icons?: IconObject[]
}

type RelatedApplication = {
  platform: "play" | "itunes" | "windows" | "chrome_web_store" | string
  url: string
  id?: string
  min_version?: string
  fingerprints?: {
    type: string
    value: string
  }[]
}

export type WebAppManifest = {
  name: string
  short_name?: string
  start_url: string
  display: "fullscreen" | "standalone" | "minimal-ui" | "browser" | string
  scope?: string
  description?: string
  icons: IconObject[]
  background_color?: string
  theme_color?: string
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "landscape-primary"
    | "landscape-secondary"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary"
    | string
  lang?: string
  shortcuts?: ShortcutObject[]
  related_applications?: RelatedApplication[]
}
