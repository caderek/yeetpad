import type { Provider } from "./actionBarTypes"
import { baseProviders } from "./providers/base"

// export const baseProviders = {
//   "amazon.com": {
//     origin: "https://www.amazon.com",
//     search: "/s?k=%s",
//     affixes: ["amazon"],
//   },
// }

const providers = baseProviders

export const affixToProvider: { [key: string]: keyof typeof providers } =
  Object.fromEntries(
    Object.entries(providers)
      .map(([providerName, { affixes }]) => {
        return (affixes ?? []).map((affix) => [affix, providerName])
      })
      .flat(),
  )
