export function getGithubSearchURL(phrase: string) {
  const searchParams = new URLSearchParams()
  searchParams.set("q", phrase)
  searchParams.set("type", "repository")

  const searchUrl = new URL(
    "https://github.com/search?q=react+forms&type=repositories",
  )
  searchUrl.search = searchParams.toString()

  return searchUrl.toString()
}
