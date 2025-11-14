export function getWikipediaSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("search", phrase)

  const searchUrl = new URL("https://en.wikipedia.org/w/index.php")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
