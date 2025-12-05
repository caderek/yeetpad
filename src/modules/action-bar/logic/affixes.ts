import { baseProviders } from "./providers/base"

const providers = baseProviders

export const affixToProvider: { [key: string]: keyof typeof providers } =
  Object.fromEntries(
    Object.entries(providers)
      .map(([providerName, { affixes }]) => {
        return (affixes ?? []).map((affix) => [affix, providerName])
      })
      .flat(),
  )
