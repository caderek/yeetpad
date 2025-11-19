export function getBoredflixSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("query", phrase)

  const searchUrl = new URL("https://boredflix.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
