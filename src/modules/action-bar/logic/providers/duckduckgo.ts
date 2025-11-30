export function getDuckduckgoSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://duckduckgo.com/")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
