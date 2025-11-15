export function getAmazonSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("k", phrase)

  const searchUrl = new URL("https://www.amazon.com/s")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
