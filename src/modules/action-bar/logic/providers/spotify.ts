export function getSpotifySearchURL(phrase: string) {
  const searchUrl = new URL(
    `https://open.spotify.com/search/${encodeURIComponent(phrase)}`,
  )

  return searchUrl
}
