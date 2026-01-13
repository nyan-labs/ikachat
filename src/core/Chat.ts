import tmi from "tmi.js";
import Logger from "./Logger";
import { BaseLayout } from "./BaseLayout";
import { Templater } from "./Templater";

export class Chat {
  public tmi: tmi.Client;  

  constructor(config: Chat.Config) {
    this.tmi = new tmi.Client({
	    options: { debug: true },
    	channels: [ config.channel ],
    });
  }

  public async run() {
    const parent = await Chat.Layout.parent;
    const messages = await Chat.Layout.messages;

    const is_at_bottom = () => window.pageYOffset + window.innerHeight >= document.body.scrollHeight;
    const scroll_to_bottom = () => window.scrollTo({ behavior: "smooth", top: document.body.scrollHeight })

    this.tmi.on("message", async (channel, userstate, message, self) => {
      const can_scroll = is_at_bottom();

      const badges = [];

      console.log(userstate["badges-raw"]);
      for(const [badge, _] of Object.entries(userstate.badges)) {
        badges.push(Chat.LayoutTemplates.badge.create({
          url: "",
          name: badge,
        }));
      }

      const item = Chat.LayoutTemplates.message.create({
        id: userstate.id,
        userid: userstate["user-id"],

        badges: badges,
        username: userstate.username,
        message: message
      });

      messages.append(item);

      if(can_scroll) {
        scroll_to_bottom();
      }
    });
    this.tmi.on("join", async (channel, _, self) => {
      if(!self) return;

      const item = Chat.LayoutTemplates.message.create({
        username: "chat", // config
        message: `changed to ${channel}`
      });
    
      messages.append(item);
    });

    await this.tmi.connect();
  }
}

export namespace Chat {
  export type Config = {
    channel: string;
  }

  export class Layout extends BaseLayout {
    public static parent = Layout.query("html > body > #chat", true);
    
    public static messages = Layout.query<HTMLDivElement>("& > .messages");
  }

  export class LayoutTemplates {
    public static message = new Templater.Template()
    .parse`<div class="message" data-id="{id}" data-userid="{userid}">
      <div class="user">
        <div class="badges">{badges}</div>
        <span class="username">{username}</span>
      </div>
      <span>: </span>
      <span class="content">{message}</span>
    </div>`;
    // .transform((vars) => {

    // });
    
    public static badge = new Templater.Template()
    .parse`<div class="badge badge-{name}" data-url="{url}"></div>`;
  }
} 