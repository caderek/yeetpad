import { getDirectUrl } from "./getDirectUrl"
import { isEmail } from "./isEmail"

const MIN_FAVICON_SIZE = 32 // Sometimes favicon service returns smaller icons, especially the fallback icon is 16p and looks bad

export async function loadFavicon(domain: string, size = 128) {
  const img = new Image()
  img.src = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`

  return new Promise((resolve) => {
    img.onload = () => resolve(img)
    img.onerror = () => resolve(null)
  }) as Promise<HTMLImageElement | null>
}

export async function getBarIcon(query: string) {
  if (query.startsWith("/")) {
    return {
      img: null,
      font: "icon-flash",
    }
  }

  if (query.startsWith("=")) {
    return {
      img: null,
      font: "icon-calc",
    }
  }

  if (isEmail(query)) {
    return {
      img: null,
      font: "icon-mail",
    }
  }

  const directUrl = getDirectUrl(query)
  if (directUrl) {
    const domain = new URL(directUrl).origin
    const size = 48
    const img = await loadFavicon(domain, size)

    if (!img || img.naturalWidth < MIN_FAVICON_SIZE) {
      return {
        img: null,
        font: "icon-web",
      }
    }

    return {
      img: img.src,
      font: "",
    }
  }

  return {
    img: null,
    font: "icon-search",
  }
}
