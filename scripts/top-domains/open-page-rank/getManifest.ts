import type { WebAppManifest } from "../types.ts"

export async function getManifest(
  manifestUrl: string,
  url: string,
): Promise<WebAppManifest | null> {
  const fullHref = manifestUrl?.startsWith("http")
    ? manifestUrl
    : new URL(manifestUrl, url).toString()

  try {
    const res = await fetch(fullHref + "?lang=en&hl=en")

    if (!res.ok) {
      return null
    }

    const manifest = await res.json()
    return manifest
  } catch (e) {
    return null
  }
}
