import Logger from "./Logger";

/// add {varnme:"substitution"}
export namespace Templater {
  export const REGEX_VAR = /(%?){([\w_]*?)}/gm;

  export const ESCAPE_SYMBOLS = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "\"": "&quote;",
    "'": "&apos;",
  };
  
  export function xss(str: string) {
    if(!str) return str;

    let new_str = "";
    for(const char of str.split("")) {
      let replacement: string|undefined = undefined;
      
      for(const [k, v] of Object.entries(Templater.ESCAPE_SYMBOLS)) {
        if(char === k) {
          replacement = v;
          break;
        }
      }

      new_str += replacement ? replacement : char;
    }

    return new_str;
  }

  export class Template {
    variables: Variable[];
    data: string;

    private concate_template_literal(data: TemplateStringsArray, ...vars: any[]) {
      let html = "";

      // bad
      for(const item of data) {
        const index = data.indexOf(item);

        const variable = vars[index];

        html += item + String(variable ?? "");
      } 

      return html;
    }

    private parse_template_literal(data: TemplateStringsArray, ...vars: any[]) {
      this.data = this.concate_template_literal(data, vars);
      this.variables = [];

      const matches = data.toString().matchAll(Templater.REGEX_VAR);

      for(const match of matches) {
        const escape = match[1] === "%" ? true : false;
        const name = match[2];

        this.variables.push({
          name: name,
          escape: escape,
          filters: new Set(),

          data: match[0]
        });
      }
    }

    private compile(variables?: { [key: string]: any }) {
      if(!variables) return this.data;

      let i = 0;
      return this.data.replace(Templater.REGEX_VAR, (...match) => {
        const name = match[2];
        const variable = this.variables[i];
        i++;

        const value = variables[variable.name];

        if(!Object.keys(variables).includes(variable.name) && !value) {
          Logger.warn(`missing variable \`${name}\``)
          return variable.data;
        }

        switch(typeof value) {
          case "string":
            return variable.escape ? Templater.xss(value) : value;
          
          case "object": {
            if(value instanceof Array) {
              let accum = "";

              for(const v of value) {
                if(v instanceof Element) {
                  accum += v.outerHTML;
                }
              }

              return accum;
            }
          }


          default: 
            return value;
        }
      });
    }

    constructor() {}

    public parse(data: TemplateStringsArray, ...vars: any[]) {
      this.parse_template_literal(data, vars);

      return this;
    }

    public create(variables?: {[key: string]: any}) {
      const html = this.compile(variables);

      const template = document.createElement("template");
      template.innerHTML = html;

      return template.content.childNodes[0];
    }
  }

  export interface Variable {
    name: string;
    escape: boolean;
    filters: Set<Templater.Filters>;

    data: string;
  }
  export enum Filters {}
}