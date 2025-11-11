import "./style.css"
import { handleUrlSearch } from "./widgets/web-search/handleUrlSearch"
import "./widgets/web-search/WebSearch"
import { WebSearch } from "./widgets/web-search/WebSearch"

handleUrlSearch()

console.log("Yeet!")

window.addEventListener("popstate", function (event) {
  // 'event.state' holds the data passed to pushState/replaceState
  console.log("Browser history navigation occurred!")
  console.log("New URL:", window.location.href)
  console.log("State data:", event.state)
})

customElements.define("web-search", WebSearch)
