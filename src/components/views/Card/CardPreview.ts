import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { TCard, Card } from "./Card";
import { IProduct, CategoryKey, ICardActions } from "../../../types";


export type TCardPreview = TCard & 
  Pick<IProduct, 'category' | 'description'> & {
    image: { src: string; alt: string };
    buttonText: string;
    buttonDisabled: boolean;
  };

export class CardPreview extends Card<TCardPreview> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;
  protected textElement: HTMLElement;
  protected cardButton: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category',this.container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image',this.container);

    this.textElement = ensureElement<HTMLElement>('.card__text', this.container);

    this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    
     if (actions?.onClick) {
      this.cardButton.addEventListener('click', actions.onClick);
    }
  }

  set category(value: string) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(categoryMap[key as CategoryKey], key === value);
    }
  }

  set image(data: {src: string, alt: string}) {
    this.setImage(this.imageElement, data.src, data.alt);
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
