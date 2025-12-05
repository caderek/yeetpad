import type { JSDOM } from "jsdom"
import { getManifest } from "./getManifest.ts"

export async function getRawMetadata(dom: JSDOM, url: string) {
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
