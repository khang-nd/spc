import Popup from "./Popup.svelte";
import { isEditable } from "./utils";

const id = "spc";
const { activeElement } = document;
let popup = null;

if (isEditable(activeElement)) {
  const { top, left, height } = activeElement.getBoundingClientRect();
  const x = left + 3;
  const y = top + height;

  popup = document.querySelector("#" + id);
  popup && popup.remove();
  popup = new Popup({
    target: document.body,
    props: { document, id, offset: { x, y } },
  });
}

export default popup;
