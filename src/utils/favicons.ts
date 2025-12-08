export async function loadFavicon(domain?: string) {
  if (!domain) {
    return null
  }

  const res = await fetch(`/data/favicons/${domain}.png`)

  if (!res.ok) {
    return null
  }

  const data = await res.blob()
  const file = new File([data], "favicon.png", { type: "image/png" })
  return URL.createObjectURL(file)
}
