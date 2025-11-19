const GOOGLE_UMD = {
  web: "14",
  ai: "50",
} as const

type UmdVal = (typeof GOOGLE_UMD)[keyof typeof GOOGLE_UMD]

function getGoogleSearchURL(phrase: string, umd?: UmdVal) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)

  if (umd) {
    searchParams.set("udm", umd)
  }

  const searchUrl = new URL("https://google.com/search")
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}

export function getGoogleDefaultSearchURL(phrase: string) {
  return getGoogleSearchURL(phrase)
}

export function getGoogleWebSearchURL(phrase: string) {
  return getGoogleSearchURL(phrase, GOOGLE_UMD.web)
}

export function getGoogleAISearchURL(phrase: string) {
  return getGoogleSearchURL(phrase, GOOGLE_UMD.ai)
}
