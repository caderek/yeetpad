import fs from "node:fs"
import path from "node:path"
import zlib from "node:zlib"

const OUT_DIR = path.join("public", "hosts")

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR)
}

const hostFilesURLs = {
  adware_malware:
    "https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts",
  nsfw: "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/porn-only/hosts",
  gambling:
    "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/gambling-only/hosts",
  social:
    "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/social-only/hosts",
  fakenews:
    "https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-only/hosts",
}

async function main() {
  for (const [key, url] of Object.entries(hostFilesURLs)) {
    const res = await fetch(url)
    const text = await res.text()
    const entries = text
      .split("\n")
      .map((entry) => entry.trim())
      .filter((entry) => entry.startsWith("0.0.0.0"))
      .map((entry) => entry.split(/\s+/)[1].replace(/^www\./, ""))

    const unique = [...new Set(entries)].sort()
    const raw = unique.join("\n")
    const compressed = zlib.gzipSync(raw)
    const filePathRaw = path.join(OUT_DIR, `${key}.txt`)
    const filePathCompressed = path.join(OUT_DIR, `${key}.gz`)
    console.log(`Created ${filePathRaw}, count:`, unique.length)
    fs.writeFileSync(filePathRaw, raw)
    fs.writeFileSync(filePathCompressed, compressed)
  }
}

main()
