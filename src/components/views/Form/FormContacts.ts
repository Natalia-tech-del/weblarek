import { IBuyer} from "../../../types";
import { Form, IForm } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export interface IFormContacts extends IForm, Pick<IBuyer, 'email' | 'phone'> {}

export class FormContacts extends Form<IFormContacts> {
  protected inputFieldEmail: HTMLInputElement;
  protected inputFieldPhone: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(events, container);
    
    this.inputFieldEmail = ensureElement<HTMLInputElement>('input[name="email"]', this.container);
    this.inputFieldPhone = ensureElement<HTMLInputElement>('input[name="phone"]', this.container);
  }

  set email(value: string) {
    this.inputFieldEmail.value = value;
  }

  set phone(value: string) {
    this.inputFieldPhone.value = value;
  }
}