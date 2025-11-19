export function getMarginaliaSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("query", phrase)

  const searchUrl = new URL("https://marginalia-search.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
