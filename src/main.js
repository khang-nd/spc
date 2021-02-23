import Popup from "./Popup.svelte";
import { isEditable } from "./utils";
import * as id from "./identifiers";

const { activeElement } = document;
let popup = null;

if (isEditable(activeElement)) {
  const { shadowRoot } = document.querySelector("#" + id.wrapper);
  const { top, left, height } = activeElement.getBoundingClientRect();
  const x = left + 3;
  const y = top + height;

  popup = shadowRoot.querySelector("#" + id.popup);
  popup && popup.remove();
  popup = new Popup({
    target: shadowRoot,
    props: { document, offset: { x, y } },
  });
}

export default popup;
