import { ensureElement } from "../../../utils/utils";
import { TCard, Card } from "./Card";
import { ICardActions } from "../../../types";
import { IComponent } from "../../../types";

export type TCardBasket = TCard & { index: number};

export class CardBasket extends Card<TCardBasket> implements IComponent {
  protected itemIndexElement: HTMLElement;
  protected basketDeleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.itemIndexElement = ensureElement<HTMLElement>('.basket__item-index',this.container);

    this.basketDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    
   if (actions?.onClick) {
      this.basketDeleteButton.addEventListener('click', actions.onClick);
    }
  }

  set index(value: number) {
    this.itemIndexElement.textContent = String(value);
  }
}