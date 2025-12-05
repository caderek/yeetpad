import fs from "node:fs"
import path from "node:path"
import readline from "node:readline/promises"
import { JSDOM } from "jsdom"
import { fetchPage } from "./fetchPage.ts"
import { getRawMetadata } from "./getRawMetadata.ts"

const IN = path.join("raw-data", "top-domains", "top10milliondomains.csv")

async function processPage(domain: string) {
  const url = `https://${domain}`
  const content = await fetchPage(url)

  if (!content) {
    console.error(`Failed fetching: ${domain}`)
    return
  }

  const dom = new JSDOM(content)
  const rawMetadata = await getRawMetadata(dom, url)
  console.log(`Fetched: ${domain}`)
  console.dir(rawMetadata, { depth: null })
}

async function main() {
  const fileStream = fs.createReadStream(IN)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })
  let lineNumber = 0

  for await (const line of rl) {
    if (lineNumber === 0) {
      lineNumber++
      continue
    }

    const chunks = line.split(",")
    const rank = Number(chunks[0].slice(1, -1))
    const domain = chunks[1].slice(1, -1)
    const openPageRank = Number(chunks[2].slice(1, -1))

    await processPage(domain)

    if (lineNumber === 3) {
      break
    }

    lineNumber++
  }

  // await processPage("entertrained.app")
  // await processPage("maps.google.com")
}

main()
