import "./style.css"
import { handleUrlSearch } from "./modules/action-bar/logic/handleUrlSearch"
import { ActionBar } from "./modules/action-bar/ActionBar"
import { TextInput } from "./reusable-components/text-input/TextInput"

if (!handleUrlSearch()) {
  console.log("Yeet!")

  customElements.define("action-bar", ActionBar)
  customElements.define("text-input", TextInput)
}
