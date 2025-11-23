import "./style.css"
import { handleUrlSearch } from "./modules/action-bar/logic/handleUrlSearch"
import { ActionBar } from "./modules/action-bar/ActionBar"
import { TextInput } from "./reusable-components/text-input/TextInput"
import "./storage/storage.ts"

handleUrlSearch().then((redirected) => {
  if (!redirected) {
    console.time("Defines")
    customElements.define("action-bar", ActionBar)
    customElements.define("text-input", TextInput)
    console.timeEnd("Defines")
  }
})
