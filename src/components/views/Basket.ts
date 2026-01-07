import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { IComponent } from "../../types";
interface IBasket {
  basketList: HTMLElement[];
  basketPrice: number;
}

export class Basket extends Component<IBasket> implements IComponent {
  protected basketListElement: HTMLElement;
  protected checkoutButton: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    
    this.basketListElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
    this.checkoutButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);
    this.checkoutButton.disabled = true;
    this.checkoutButton.addEventListener('click', () => {
      this.events.emit('basket:checkout');
    });
  }

  set basketList(items: HTMLElement[]) {
    this.basketListElement.replaceChildren(...items);
    this.checkoutButton.disabled = items.length === 0;
  }

  set basketPrice(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }
}