export function getBraveSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://search.brave.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
