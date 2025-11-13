export function getYoutubeSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("search_query", phrase)

  const searchUrl = new URL("https://youtube.com/results")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
