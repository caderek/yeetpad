export function getNpmSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://www.npmjs.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
