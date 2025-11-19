export function getMojeekSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://www.mojeek.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
