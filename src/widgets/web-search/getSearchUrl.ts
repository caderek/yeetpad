import {
  getGoogleWebSearchURL,
  getGoogleAISearchURL,
  getGoogleDefaultSearchURL,
} from "./providers/google"
import { getRedditSearchURL } from "./providers/reddit"
import { getCHatGPTSearchURL } from "./providers/chatgpt"

export const getSerachUrl = {
  google: getGoogleDefaultSearchURL,
  google_web: getGoogleWebSearchURL,
  google_ai: getGoogleAISearchURL,
  reddit: getRedditSearchURL,
  chatgpt: getCHatGPTSearchURL,
}
