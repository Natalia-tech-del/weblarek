import { createElement, ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

interface IBasket {
  basketList: HTMLElement[];
  buttonDisabled: boolean;
  basketPrice: number;
}

export class Basket extends Component<IBasket> {
  protected basketListElement: HTMLElement;
  protected basketEmptyElement: HTMLElement;
  protected checkoutButton: HTMLButtonElement;
  protected priceElement: HTMLElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);
    
    this.basketListElement = ensureElement<HTMLElement>('.basket__list', this.container);
    this.basketEmptyElement = createElement<HTMLElement>('div', {
      className: 'basket__empty',
      innerHTML: '<p>Корзина пуста</p>',
      style: 'display: none;'
    });
    this.basketListElement.after(this.basketEmptyElement);
    this.priceElement = ensureElement<HTMLElement>('.basket__price', this.container);
    this.checkoutButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this.checkoutButton.addEventListener('click', () => {
      this.events.emit('basket:checkout');
    });
  }

  set basketList(items: HTMLElement[]) {
    if (!items || (items.length === 0)) {
      this.basketListElement.replaceChildren();
      this.basketEmptyElement.style.display = 'block';
      this.buttonDisabled = true;
    } else {
    this.basketListElement.replaceChildren(...items);
    this.basketEmptyElement.style.display = 'none';
    this.buttonDisabled = false;
    }
  }

  set buttonDisabled(value: boolean){
    this.checkoutButton.disabled = value;
  }

  set basketPrice(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }
}