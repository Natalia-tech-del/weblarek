import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";

export interface IForm {
  errors: string;
  buttonDisabled: boolean;
}

export abstract class Form<T extends IForm> extends Component<T> {
  protected formSubmitButton: HTMLButtonElement;
  protected errorsFormElement: HTMLElement;
  protected formElement: HTMLFormElement;

  constructor(container: HTMLElement) {
    super(container);
    
    this.formElement = this.container as HTMLFormElement;
    this.formSubmitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.formElement);
    this.errorsFormElement = ensureElement<HTMLElement>('.form__errors', this.formElement);
  }

  set errors(value: string) {
    this.errorsFormElement.textContent = value;
  }

  set buttonDisabled(value: boolean){
    this.formSubmitButton.disabled = value;
  }
}