export function getCHatGPTSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  const searchUrl = new URL("https://chat.openai.com")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
