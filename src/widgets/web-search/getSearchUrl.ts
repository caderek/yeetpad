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
}
