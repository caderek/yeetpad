import fs from "node:fs"
import path from "node:path"
import readline from "node:readline"

export async function readLineByLine(
  file: string,
  action: (line: string) => void,
) {
  const fileStream = fs.createReadStream(file)

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  })

  for await (const line of rl) {
    action(line)
    // break
  }
}

const INPUT_DIR = process.argv[2]

console.log(INPUT_DIR)

const files = fs.readdirSync(INPUT_DIR).filter((file) => !file.endsWith("gz"))

async function main() {
  let popular: { ngram: string; score: number }[] = []
  for (const file of files) {
    await readLineByLine(path.join(INPUT_DIR, file), (line) => {
      const [rawNgram, ...years] = line.split("\t")
      const ngram = rawNgram.split(" ").map((x) => x.split("_")[0])

      const isOK = ngram.every((x) => /[a-z0-9]/i.test(x))

      if (isOK) {
        const score = years.reduce((sum, entry) => {
          const [year, occurences] = entry.split(",").map(Number)
          return sum + occurences
        }, 0)
        // console.log(years)
        if (score > 10000) {
          const fullNgram = ngram.join(" ")
          console.log(fullNgram, score)
          popular.push({ ngram: fullNgram, score })
        }
      }
    })
  }

  console.log("Popular", popular.length)
}

main()
