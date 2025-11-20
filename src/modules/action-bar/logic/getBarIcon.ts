import { getDirectUrl } from "./getDirectUrl"
import { isEmail } from "./isEmail"

export function getBarIcon(query: string) {
  if (query.startsWith("/")) {
    return "icon-flash"
  }

  if (query.startsWith("=")) {
    return "icon-calc"
  }

  if (isEmail(query)) {
    console.log("email!")
    return "icon-mail"
  }

  if (getDirectUrl(query)) {
    console.log("url!")
    return "icon-web"
  }

  return "icon-search"
}
