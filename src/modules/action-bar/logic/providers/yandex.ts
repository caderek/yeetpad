export function getYandexSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("text", phrase)

  const searchUrl = new URL("https://yandex.com/search/")
  searchUrl.search = searchParams.toString()

  return searchUrl
}
