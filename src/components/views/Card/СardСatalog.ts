import { CardWithCategoryImage, TCardWithCategoryImage } from "./CardWithCategoryImage";
import { ICardActions } from "../../../types";
import { IComponent } from "../../../types";

export class CardCatalog extends CardWithCategoryImage<TCardWithCategoryImage> implements IComponent {
  
  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
   
    if (actions?.onClick) {
      this.container.addEventListener('click', actions.onClick);
    }
  }
}