import Popup from "./Popup.svelte";

const existingPopup = document.querySelector("#spc");
if (existingPopup) existingPopup.remove();

export default new Popup({ target: document.body });
