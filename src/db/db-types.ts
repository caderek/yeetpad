type HistoryEntry = {
  last: number
  total: number
}

type SubpageVisitEntry = HistoryEntry

export type BrowsingHistoryEntry = HistoryEntry & {
  host: string
  subpages: {
    [path: string]: SubpageVisitEntry
  }
}

export type CommandHistoryEntry = HistoryEntry & {
  command: string
}

export type SearchHistoryEntry = HistoryEntry & {
  query: string
}

export type Stores = {
  browsing_history: { key: "host"; val: BrowsingHistoryEntry }
  command_history: { key: "command"; val: CommandHistoryEntry }
  search_history: { key: "query"; val: SearchHistoryEntry }
}
