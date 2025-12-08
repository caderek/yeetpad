import { CalcProvider } from "./providers/CalcProvider"
import { CommandProvider } from "./providers/CommandProvider"
import { DirectProvider } from "./providers/DirectProvider"
import { MailProvider } from "./providers/MailProvider"
import { SearchProvider } from "./providers/SearchProvider"

export type Route =
  | {
      type: "redirect"
      value: string | URL
    }
  | {
      type: "inline"
      value: string
    }
  | {
      type: "command"
      value: Promise<boolean> // temp for testing, it shoudl be a command result
    }

export async function executeQuery(
  provider:
    | CalcProvider
    | CommandProvider
    | DirectProvider
    | MailProvider
    | SearchProvider,
): Promise<Route> {
  if (provider instanceof CalcProvider) {
    const result = await provider.execute()

    if (typeof result === "string") {
      return {
        type: "inline",
        value: `=${result}`,
      }
    } else {
      provider = result // If the calculation can't be done via API, assign SearchProvider (wolphram Alpha)
    }
  }

  if (provider instanceof CommandProvider) {
    return {
      type: "command",
      value: Promise.resolve(true),
    }
  }

  return {
    type: "redirect",
    value: provider.url,
  }
}
