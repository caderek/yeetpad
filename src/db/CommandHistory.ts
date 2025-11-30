import { database } from "./db"
import type { CommandHistoryEntry } from "./db-types"

export class CommandHistory {
  static async add(command: string) {
    return (await database).write(["command_history"]).run(async (stores) => {
      const timestamp = Date.now()

      const entry = await stores.command_history.get(command)

      if (!entry) {
        const entry: CommandHistoryEntry = {
          command,
          last: timestamp,
          total: 1,
        }

        await stores.command_history.add(entry)
        return
      }

      entry.total += 1
      entry.last = timestamp

      stores.command_history.put(entry)
    })
  }
}
