import Alpine from "alpinejs";
import { Chat } from "./core/Chat";
import { TwitchIRC } from "./core/TwitchIRC";

declare global {
  interface Window {
    ikachat: Chat;
    ikaconfig?: Chat.Config;
  }
}