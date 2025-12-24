import { Component } from "../base/Component";

interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> {
  protected catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.catalogElement = this.container; 
  }

  set catalog(items: HTMLElement[]) {
    if (!items || (items.length === 0)) {
      this.catalogElement.replaceChildren();
    } else {
    this.catalogElement.replaceChildren(...items);
    }
  }
}

