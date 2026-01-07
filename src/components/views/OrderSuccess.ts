import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IComponent } from "../../types";

interface IOrderSuccess {
  successCost: number;
}

export class OrderSuccess extends Component<IOrderSuccess> implements IComponent {
  protected orderSuccessElement: HTMLElement;
  protected successCloseButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.orderSuccessElement = ensureElement<HTMLElement>('.order-success__description', this.container);
    this.successCloseButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

    this.successCloseButton.addEventListener('click', () => {
      this.events.emit('order:success');
    });
  }

  set successCost(value: number) {
    this.orderSuccessElement.textContent = `Списано ${value} синапсов`;
  }
}