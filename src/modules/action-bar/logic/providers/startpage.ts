export function getStartpageSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://www.startpage.com/sp/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
