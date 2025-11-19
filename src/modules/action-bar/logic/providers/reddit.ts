export function getRedditSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://www.reddit.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
