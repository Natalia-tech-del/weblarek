import { IBuyer, TPayment } from "../../../types";
import { Form, IForm } from "./Form";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../../base/Events";

export interface IFormOrder extends IForm, Pick<IBuyer, 'address' | 'payment'> {}

export class FormOrder extends Form<IFormOrder> {
  protected formButtonCard: HTMLButtonElement;
  protected formButtonCash: HTMLButtonElement;
  protected inputFieldAddress: HTMLInputElement;

  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(events, container);
    
    this.formButtonCard = ensureElement<HTMLButtonElement>('button[name="card"]', this.container);
    this.formButtonCash = ensureElement<HTMLButtonElement>('button[name="cash"]', this.container);
    this.inputFieldAddress = ensureElement<HTMLInputElement>('input[name="address"]', this.container);
    
    this.formButtonCard.addEventListener('click', () => {
      this.events.emit('order:payment:card');
    });

    this.formButtonCash.addEventListener('click', () => {
      this.events.emit('order:payment:cash');
    });

    this.inputFieldAddress.addEventListener('input', () => {
      this.events.emit('order:address:change', {address: this.inputFieldAddress.value});
    })
  }

  set address(value: string) {
    this.inputFieldAddress.value = value;
  }

  set payment(value: TPayment){
    this.formButtonCard.classList.toggle('button_alt-active', value === 'card');
    this.formButtonCash.classList.toggle('button_alt-active', value === 'cash');
  }
}