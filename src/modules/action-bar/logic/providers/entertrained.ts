export function getEntertrainedSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("search", phrase)
  searchParams.set("order", "relevance")

  const searchUrl = new URL("https://entertrained.app/books")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
