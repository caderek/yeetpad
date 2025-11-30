export function getStackoverflowSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://stackoverflow.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
