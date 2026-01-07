import { Component } from "../base/Component";
import { IComponent } from "../../types";

interface IGallery {
  catalog: HTMLElement[];
}

export class Gallery extends Component<IGallery> implements IComponent {
  protected catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.catalogElement = this.container; 
  }

  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items);
  }
}

