import Logger from "./Logger";

export class Chat {
  public readonly ws: WebSocket;
  
  private _channel: string;
  private set channel(channel) {
    this._channel = channel;
  }
  public get channel() {
    return this._channel;
  }

  public messages: Chat.Message[] = [];

  constructor(config: Chat.Config) {
    this.ws = new WebSocket(Chat.ENDPOINT_TWITCH_WSS);
  
    this.channel = config.channel; 
  }

  public start() {
    return new Promise((resolve, reject) => {
      this.ws.addEventListener("message", (event) => console.log(event));
      this.ws.addEventListener("open", (event) => {
        this.authenticate("meow", Chat.ANONYMOUS_NICK);
    
        this.capabilities(
          Chat.TwitchCapabilities.COMMANDS, 
          Chat.TwitchCapabilities.MEMBERSHIP
        );
    
        this.join(this.channel);
        
        resolve(true);
      });
      this.ws.addEventListener("error", (event) => {
        reject(false);
      })
    });
  }

  private command(line: string) {
    Logger.debug(line);

    this.ws.send(line)
  }
  

  public authenticate(pass: string, nick: string) {
    if(pass.length == 0) {
      throw new Error("`pass` must be longer than 0 characters.");
    }

    this.command(`PASS ${pass}\r\n`);
    this.command(`NICK ${nick}\r\n`);
  }
   
  public capabilities(...capabilities: Chat.TwitchCapabilities[]) {
    this.command(`CAP REQ :${capabilities.join(" ")}\r\n`);
  }

  public join(channel: string) {
    this.channel = channel; 

    this.command(`JOIN #${channel}`);
  }
}

export namespace Chat {
  export type Config = {
    channel: string;
  }

  export const ENDPOINT_TWITCH_WSS = "wss://irc-ws.chat.twitch.tv:443";
  export const ANONYMOUS_NICK = "justinfan69";

  export enum TwitchCapabilities {
    COMMANDS = "twitch.tv/commands",
    MEMBERSHIP = "twitch.tv/membership",
    TAGS = "twitch.tv/membership",
  }

  export type Message = {
    content: string; 
  }
} 