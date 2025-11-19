export function getKagiSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://kagi.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
