import { IProduct, CategoryKey } from "../../../types";
import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { TCard, Card } from "./Card";

export type TCardWithCategoryImage = TCard & 
  Pick<IProduct, 'category'> & {
    image: { src: string; alt: string };
  };

export abstract class CardWithCategoryImage<T extends TCardWithCategoryImage> extends Card<T> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.categoryElement = ensureElement<HTMLElement>('.card__category',this.container);

    this.imageElement = ensureElement<HTMLImageElement>('.card__image',this.container);
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
}