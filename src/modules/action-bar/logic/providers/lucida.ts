export function getLucidaSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("service", "tidal")
  searchParams.set("country", "US")
  searchParams.set("query", phrase)

  const searchUrl = new URL("https://lucida.to/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
