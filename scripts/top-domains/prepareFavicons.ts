import fs from "node:fs"
import path from "node:path"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const IN = path.join("public", "data", "top-domains", "all.txt")
const OUT = path.join("public", "data", "favicons")

if (!fs.existsSync(OUT)) {
  fs.mkdirSync(OUT, { recursive: true })
}

const domains = fs.readFileSync(IN, { encoding: "utf8" }).split("\n")
const existing = new Set(fs.readdirSync(OUT))

async function getFavicon(domain: string, size: number) {
  const res = await fetch(
    `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=${size}`,
  )
  const img = await res.arrayBuffer()

  fs.writeFileSync(path.join(OUT, `${domain}.png`), Buffer.from(img))
}

async function main() {
  for (const domain of domains) {
    if (existing.has(`${domain}.png`)) {
      console.log(`Favicon for ${domain} already exists. Skipping.`)
      continue
    }

    console.log(`Fetching favicon for ${domain}...`)
    await getFavicon(domain, 128)
    await delay(500)
  }
}

main().then(() => console.log("Done"))
