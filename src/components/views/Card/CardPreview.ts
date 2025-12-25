import { categoryMap } from "../../../utils/constants";
import { ensureElement } from "../../../utils/utils";
import { TCard, Card } from "./Card";
import { IProduct, CategoryKey } from "../../../types";

export type TCardPreview = TCard & 
  Pick<IProduct, 'category' | 'description'> & {
    image: { src: string; alt: string };
    buttonText: string};

export class CardPreview extends Card<TCardPreview> {

}