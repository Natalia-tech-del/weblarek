import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IProduct } from "../../../types";

export type TCard = Pick<IProduct, 'title' | 'price'>;

export abstract class Card<T extends TCard> extends Component<T> {
  protected cardTitleElement: HTMLElement;
  protected cardPriceElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardTitleElement = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPriceElement = ensureElement<HTMLElement>('.card__price', this.container);
  }

  set title(value: string) {
    this.cardTitleElement.textContent = value;
  }

  set price(value: number | null) {
    if (value) {
      this.cardPriceElement.textContent = `${value} синапсов`;
    } else {
      this.cardPriceElement.textContent = 'Бесценно';  
     }
  }
}