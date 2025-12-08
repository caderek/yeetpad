export function isCorrectUrl(url: string | URL) {
  if (url instanceof URL) {
    return true
  }

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export function getDomain(url: URL) {
  const hostname = url.hostname

  if (hostname.startsWith("www.")) {
    return hostname.slice(4)
  }

  return hostname
}
