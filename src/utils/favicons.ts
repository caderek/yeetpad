let url: string | null = null

export async function loadFavicon(domain?: string) {
  if (url) {
    URL.revokeObjectURL(url)
    url = null
  }

  if (!domain) {
    return null
  }

  try {
    const res = await fetch(`/data/favicons/${domain}.png`)

    if (!res.ok) {
      return null
    }

    const data = await res.blob()
    const file = new File([data], `${domain}.png`, { type: "image/png" })
    url = URL.createObjectURL(file)

    return url
  } catch {
    return null
  }
}
