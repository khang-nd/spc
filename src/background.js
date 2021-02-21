import browser from "webextension-polyfill";

const { contextMenus, tabs, commands } = browser;

function run() {
  tabs.executeScript({ file: "/build/main.js" });
}

contextMenus.removeAll().then(() => {
  contextMenus.create({
    id: "spc",
    title: "Special characters",
    contexts: ["editable"],
  });
  contextMenus.onClicked.addListener(run);
  commands.onCommand.addListener(run);
});
