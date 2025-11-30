export function getSearxSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://metasearx.com/")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
