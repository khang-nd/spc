// inject CSS to the Shadow DOM
// to avoid CSS collision with the main DOM

import browser from "webextension-polyfill";
import { wrapper as id } from "./identifiers";

window.addEventListener("load", () => {
  const wrapper = document.createElement("div");
  const link = document.createElement("link");
  const shadow = wrapper.attachShadow({ mode: "open" });

  wrapper.id = id;
  link.rel = "stylesheet";
  link.href = browser.extension.getURL("build/main.css");
  shadow.append(link);
  document.body.append(wrapper);
});
