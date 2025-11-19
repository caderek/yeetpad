export function getGmailSearchURL(phrase: string) {
  const searchUrl = new URL(
    `https://mail.google.com/#search/${encodeURIComponent(phrase)}`,
  )

  return searchUrl.toString()
}
