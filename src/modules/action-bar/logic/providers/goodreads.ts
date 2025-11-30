export function getGoodreadsSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://www.goodreads.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
