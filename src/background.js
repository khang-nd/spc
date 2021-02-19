import browser from "webextension-polyfill";

const { contextMenus, tabs } = browser;

contextMenus.create({
  id: "spc",
  title: "Special characters",
  contexts: ["editable"],
});

contextMenus.onClicked.addListener(() =>
  tabs.executeScript({ file: "/build/main.js" })
);
