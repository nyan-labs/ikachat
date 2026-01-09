import Alpine from "alpinejs";
import { Chat } from "./core/Chat";

declare global {
  interface Window {
    ikachat: Chat;
    $ikachat: Chat;
    ikaconfig?: Chat.Config;

    Alpine: Alpine;
  }
}