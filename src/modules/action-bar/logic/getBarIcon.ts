import { getDirectUrl } from "./getDirectUrl"
import { isEmail } from "./isEmail"

export function getBarIcon(query: string) {
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
    const domain = new URL(directUrl).hostname
    return {
      img: `https://icon.horse/icon/${domain}`,
      font: "",
    }
  }

  return {
    img: null,
    font: "icon-search",
  }
}
