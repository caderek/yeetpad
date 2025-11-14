import "./style.css"
import { handleUrlSearch } from "./widgets/web-search/handleUrlSearch"
import "./widgets/web-search/WebSearch"
import { WebSearch } from "./widgets/web-search/WebSearch"

if (!handleUrlSearch()) {
  console.log("Yeet!")

  customElements.define("web-search", WebSearch)
}
