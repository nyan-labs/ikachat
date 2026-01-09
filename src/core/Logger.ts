export class Logger {
  public level: Logger.Levels = Logger.Levels.WARN;
  public namespace: string = "ikachat";

  constructor() {

  }

  public trace(...args: any) {
    const format = `${this.namespace}::trace: ${args}`;

    console.trace(format);
  }
  public debug(...args: any) {
    const format = `${this.namespace}::debug: ${args}`;

    console.log(format);
  }
  public info(...args: any) {
    const format = `${this.namespace}::info: ${args}`;

    console.log(format);
  }
  public warn(...args: any) {
    const format = `${this.namespace}::warn: ${args}`;

    console.log(format);
  }
  public error(...args: any) {
    const format = `${this.namespace}::error: ${args}`;

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