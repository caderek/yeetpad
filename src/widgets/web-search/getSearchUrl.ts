import {
  getGoogleWebSearchURL,
  getGoogleAISearchURL,
  getGoogleDefaultSearchURL,
} from "./providers/google"
import { getRedditSearchURL } from "./providers/reddit"
import { getCHatGPTSearchURL } from "./providers/chatgpt"
import { getYoutubeSearchURL } from "./providers/youtube"
import { getBoredflixSearchURL } from "./providers/boredflix"

export const getSerachUrl = {
  google: getGoogleDefaultSearchURL,
  google_web: getGoogleWebSearchURL,
  google_ai: getGoogleAISearchURL,
  reddit: getRedditSearchURL,
  chatgpt: getCHatGPTSearchURL,
  youtube: getYoutubeSearchURL,
  boredflix: getBoredflixSearchURL,
}
