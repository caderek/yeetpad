import { fetchJSON } from "../../../utils/fetchJSON"

export async function calculate(expr: string) {
  const answer = await fetchJSON<{
    result: string | null
    error: string | null
  }>("https://api.mathjs.org/v4/", { body: { expr } })
  return answer?.result ?? null
}
