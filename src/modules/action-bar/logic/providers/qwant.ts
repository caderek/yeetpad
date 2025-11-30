export function getQwantSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://www.qwant.com/")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
