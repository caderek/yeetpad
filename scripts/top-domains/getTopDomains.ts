import fs from "node:fs"
import path from "node:path"
import index from "../../raw-data/top-domains/index.json" with { type: "json" }

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const OUT = path.join("raw-data", "top-domains", "entries")

async function main() {
  for (const { name, id } of index) {
    const res = await fetch("https://dataforseo.com/wp-admin/admin-ajax.php", {
      headers: {
        accept: "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9,pl;q=0.8",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        pragma: "no-cache",
      },
      body: `action=dfs_ranked_domains&location=${id}`,
      method: "POST",
      mode: "cors",
      credentials: "include",
    })

    const data = await res.json()

    if (!res.ok) {
      console.error(`Failed to fetch data for ${name}`)
    }

    fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(data))
    console.log(`Fetched data for ${name}`)
    await delay(100)
  }
}

main().then(() => console.log("done"))
