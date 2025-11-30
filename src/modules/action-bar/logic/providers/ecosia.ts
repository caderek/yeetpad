export function getEcosiaSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://www.ecosia.org/search")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
