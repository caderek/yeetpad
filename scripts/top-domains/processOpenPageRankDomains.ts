import fs from "node:fs"
import path from "node:path"
import readline from "node:readline/promises"
import { JSDOM } from "jsdom"
import type { WebAppManifest } from "./types.ts"

const IN = path.join("raw-data", "top-domains", "top10milliondomains.csv")

async function getRawMetadata(dom: JSDOM, url: string) {
  const iconTags = dom.window.document.querySelectorAll(
    'link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]',
  )

  const manifestUrl = dom.window.document
    .querySelector('link[rel="manifest"]')
    ?.getAttribute("href")

  return {
    title: dom.window.document.title,
    description:
      dom.window.document
        .querySelector('meta[name="description"')
        ?.getAttribute("content") ?? null,
    og: {
      url:
        dom.window.document
          .querySelector('meta[property="og:url"')
          ?.getAttribute("content") ?? null,
      type:
        dom.window.document
          .querySelector('meta[property="og:type"')
          ?.getAttribute("content") ?? null,
      title:
        dom.window.document
          .querySelector('meta[property="og:title"')
          ?.getAttribute("content") ?? null,
      description:
        dom.window.document
          .querySelector('meta[property="og:description"')
          ?.getAttribute("content") ?? null,
      image:
        dom.window.document
          .querySelector('meta[property="og:image"')
          ?.getAttribute("content") ?? null,
    },
    icons: [...iconTags].map((x) => {
      const href = x.getAttribute("href")

      const fullHref = href
        ? href?.startsWith("http")
          ? href
          : new URL(href ?? "", url).toString()
        : null

      return {
        type: x.getAttribute("rel"),
        sizes: x.getAttribute("sizes"),
        href: fullHref,
      }
    }),
    manifest: manifestUrl ? await getManifest(manifestUrl, url) : null,
  }
}

function prepareMetadata(rawMetadata: ReturnType<typeof getRawMetadata>) {
  // choose favicon image title and descripton, maybe some more
}

async function getManifest(
  manifestUrl: string,
  url: string,
): Promise<WebAppManifest | null> {
  const fullHref = manifestUrl?.startsWith("http")
    ? manifestUrl
    : new URL(manifestUrl, url).toString()

  try {
    const res = await fetch(fullHref + "?lang=en&hl=en")

    if (!res.ok) {
      return null
    }

    const manifest = await res.json()
    return manifest
  } catch (e) {
    return null
  }
}

async function processPage(domain: string) {
  const url = `https://${domain}`
  console.log(`Processing ${url}`)
  try {
    const res = await fetch(url, {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=1",
        "cache-control": "no-cache",
        pragma: "no-cache",
        priority: "u=0, i",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "omit",
    })

    if (!res.ok) {
      console.error(`Failed fetching the ${domain} page, ${res.status}`)
      return null
    }

    const content = await res.text()
    const dom = new JSDOM(content)
    const rawMetadata = await getRawMetadata(dom, url)
    console.log(`Fetched the ${domain} page, ${res.status}`)
    console.dir(rawMetadata, { depth: null })
  } catch (e) {
    return null
  }
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

  await processPage("entertrained.app")
  await processPage("maps.google.com")
}

main()
