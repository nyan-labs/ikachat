import { Chat } from "./core/Chat";
import Logger from "./core/Logger";

import "./index.css";

document.addEventListener("DOMContentLoaded", async () => {
  Logger.debug("hi");
  Logger.trace("hi");

  const chat = new Chat(window.ikaconfig);
  window.ikachat = chat;

  await chat.run();
});