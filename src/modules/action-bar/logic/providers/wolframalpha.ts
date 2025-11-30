export function getWolframalphaSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("i", phrase)

  const searchUrl = new URL("https://www.wolframalpha.com/input")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
