export function getTwitterSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://x.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
