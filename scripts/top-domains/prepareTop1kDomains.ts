import fs from "node:fs"
import path from "node:path"

const IN = path.join("raw-data", "top-domains", "top-1k-by-country")
const OUT = path.join("public", "data", "top-domains")

if (!fs.existsSync(OUT)) {
  fs.mkdirSync(OUT, { recursive: true })
}

const inFiles = fs.readdirSync(IN)
const allDomains: string[][] = []

for (const file of inFiles) {
  const [name] = file.split(".")

  const content: { domain: string }[] = JSON.parse(
    fs.readFileSync(path.join(IN, file), { encoding: "utf8" }),
  )

  const domains = content.map((entry) => entry.domain)
  allDomains.push(domains)

  fs.writeFileSync(path.join(OUT, `${name}.txt`), domains.join("\n"))

  console.log("Done:", name)
}

const uniqueDomains = Array.from(new Set(allDomains.flat()))

console.log({ uniqueDomains: uniqueDomains.length })

fs.writeFileSync(path.join(OUT, "all.txt"), uniqueDomains.join("\n"))
