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
import { getAmazonSearchURL } from "./providers/amazon"
import { getEbaySearchURL } from "./providers/ebay"
import { getEtsySearchURL } from "./providers/etsy"
import { getTwitterSearchURL } from "./providers/twitter"
import { getBraveSearchURL } from "./providers/brave"
import { getDuckduckgoSearchURL } from "./providers/duckduckgo"
import { getEcosiaSearchURL } from "./providers/ecosia"
import { getKagiSearchURL } from "./providers/kagi"
import { getMarginaliaSearchURL } from "./providers/marginalia"
import { getMojeekSearchURL } from "./providers/mojeek"
import { getQwantSearchURL } from "./providers/qwant"
import { getSearxSearchURL } from "./providers/searx"
import { getYandexSearchURL } from "./providers/yandex"

export type SearchProviderCategory =
  | "ai"
  | "email"
  | "general"
  | "knowledge"
  | "media"
  | "shopping"
  | "social"

export const getSerachUrl = {
  amazon: getAmazonSearchURL,
  boredflix: getBoredflixSearchURL,
  brave: getBraveSearchURL,
  chatgpt: getCHatGPTSearchURL,
  duckduckgo: getDuckduckgoSearchURL,
  ebay: getEbaySearchURL,
  ecosia: getEcosiaSearchURL,
  etsy: getEtsySearchURL,
  github: getGithubSearchURL,
  gmail: getGmailSearchURL,
  goodreads: getGoodreadsSearchURL,
  google: getGoogleDefaultSearchURL,
  google_web: getGoogleWebSearchURL,
  google_ai: getGoogleAISearchURL,
  kagi: getKagiSearchURL,
  mariginalia: getMarginaliaSearchURL,
  mojeek: getMojeekSearchURL,
  npm: getNpmSearchURL,
  qwant: getQwantSearchURL,
  reddit: getRedditSearchURL,
  searx: getSearxSearchURL,
  spotify: getSpotifySearchURL,
  startpage: getStartpageSearchURL,
  twitter: getTwitterSearchURL,
  wikipedia: getWikipediaSearchURL,
  yandex: getYandexSearchURL,
  youtube: getYoutubeSearchURL,
}
