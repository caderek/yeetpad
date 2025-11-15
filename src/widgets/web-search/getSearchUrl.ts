import {
  getGoogleWebSearchURL,
  getGoogleAISearchURL,
  getGoogleDefaultSearchURL,
} from "./providers/google"
import { getRedditSearchURL } from "./providers/reddit"
import { getCHatGPTSearchURL } from "./providers/chatgpt"
import { getYoutubeSearchURL } from "./providers/youtube"
import { getBoredflixSearchURL } from "./providers/boredflix"
import { getSpotifySearchURL } from "./providers/spotify"
import { getGoodreadsSearchURL } from "./providers/goodreads"
import { getWikipediaSearchURL } from "./providers/wikipedia"
import { getGithubSearchURL } from "./providers/github"
import { getNpmSearchURL } from "./providers/npm"
import { getGmailSearchURL } from "./providers/gmail"
import { getStartpageSearchURL } from "./providers/startpage"

export const getSerachUrl = {
  google: getGoogleDefaultSearchURL,
  google_web: getGoogleWebSearchURL,
  google_ai: getGoogleAISearchURL,
  reddit: getRedditSearchURL,
  chatgpt: getCHatGPTSearchURL,
  youtube: getYoutubeSearchURL,
  boredflix: getBoredflixSearchURL,
  spotify: getSpotifySearchURL,
  goodreads: getGoodreadsSearchURL,
  wikipedia: getWikipediaSearchURL,
  github: getGithubSearchURL,
  npm: getNpmSearchURL,
  gmail: getGmailSearchURL,
  startpage: getStartpageSearchURL,
}
