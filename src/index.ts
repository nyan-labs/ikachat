import { Chat } from "./core/Chat";
import Logger from "./core/Logger";
import Alpine from "alpinejs";

window.Alpine = Alpine;

document.addEventListener("DOMContentLoaded", async () => {
  Logger.debug("hi");
  Logger.trace("hi");

  const chat = new Chat(window.ikaconfig);
  await chat.start();

  window.ikachat = chat;
  window.$ikachat = Alpine.reactive(window.ikachat)

  console.log(chat.channel);

  Alpine.start();
});