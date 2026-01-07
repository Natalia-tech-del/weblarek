import { ensureElement } from "../../../utils/utils";
import { IProduct } from "../../../types";
import { IEvents } from "../../base/Events";
import { CardWithCategoryImage, TCardWithCategoryImage } from "./CardWithCategoryImage";
import { IComponent } from "../../../types";


export type TCardPreview = TCardWithCategoryImage & 
  Pick<IProduct, 'description'> & {
    buttonText: string;
    buttonDisabled: boolean;
  };

export class CardPreview extends CardWithCategoryImage<TCardPreview> implements IComponent {
  protected textElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(protected events: IEvents, container: HTMLElement) {
    super(container);

    this.textElement = ensureElement<HTMLElement>('.card__text', this.container);

    this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.cardButton.addEventListener('click', () => {
      this.events.emit('cardPreview:buttonClick');
    });
  }

  set description(value: string) {
    this.textElement.textContent = value;
  }

  set buttonText(value: string) {
    this.cardButton.textContent = value;
  }

  set buttonDisabled(value: boolean){
    this.cardButton.disabled = value;
  }
}
