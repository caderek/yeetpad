type SubpageVisitRecord = {
  count: number
  last_visited: number
  total_visits: number
}

export type BrowserHistoryRedord = {
  host: string
  total_visits: number
  last_visited: number
  subpages: {
    [path: string]: SubpageVisitRecord
  }
}

export type SearchHistoryRecord = {
  query: string
  total_searches: number
  last_used: number
}
