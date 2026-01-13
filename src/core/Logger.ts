export class Logger {
  public level: Logger.Levels = Logger.Levels.WARN;
  public namespace: string;

  constructor(namespace: string = "ikachat") {
    this.namespace = namespace;
  }

  //ugly lol
  public trace(...args: any) {
    const format = `${this.namespace}::trace: ${args.join(" ")}`;

    console.trace(format);
  }
  public debug(...args: any) {
    const format = `${this.namespace}::debug: ${args.join(" ")}`;

    console.log(format);
  }
  public info(...args: any) {
    const format = `${this.namespace}::info: ${args.join(" ")}`;

    console.log(format);
  }
  public warn(...args: any) {
    const format = `${this.namespace}::warn: ${args.join(" ")}`;

    console.log(format);
  }
  public error(...args: any) {
    const format = `${this.namespace}::error: ${args.join(" ")}`;

    console.error(format);
  }
}

export namespace Logger {
  export enum Levels {
    TRACE,
    DEBUG,
    INFO,
    WARN,
    ERROR,

    OFF
  }
}

export default new Logger;