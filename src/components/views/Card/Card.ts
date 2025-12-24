import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

interface ICard {
  title: string;
  price: number;
}

export abstract class Card extends Component<ICard> {
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

  set price(value: number) {
    this.cardPriceElement.textContent = `${value} синапсов`;
  }
}