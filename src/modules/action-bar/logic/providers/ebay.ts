export function getEbaySearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("_nkw", phrase)

  const searchUrl = new URL("https://www.ebay.com/sch/i.html")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
