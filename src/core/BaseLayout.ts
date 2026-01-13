export class BaseLayout {
  public static query<T = Element>(selectors: string, use_document = false): Promise<T> {
    return new Promise((resolve, reject) => {
      document.addEventListener("DOMContentLoaded", async (event) => {
        const target = use_document ? document : await this.parent;

        const element = target.querySelector(selectors);

        resolve(element as T);
      });
    });
  }

  public static parent: Promise<Element> = undefined; 
}