import { IValidationErrors } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

export interface IForm {
  errors: IValidationErrors | '';
  buttonDisabled: boolean;
}

export abstract class Form<T extends IForm> extends Component<T> {
  protected formSubmitButton: HTMLButtonElement;
  protected errorsFormElement: HTMLElement;
  
  constructor(protected events: IEvents, container: HTMLFormElement) {
    super(container);

    this.formSubmitButton = ensureElement<HTMLButtonElement>('button[type="submit"]', this.container);
    this.errorsFormElement = ensureElement<HTMLElement>('.form__errors', this.container);

    this.container.addEventListener('submit', (evt: Event) => {
      evt.preventDefault();
      this.events.emit(`${this.container.getAttribute('name')}:submit`);
    });
  }

  set errors(errors: IValidationErrors | '') {
    if (errors === '') {
      this.errorsFormElement.textContent = errors;
      return;
    }
    const errorText = Object.values(errors).join('\n');
    this.errorsFormElement.textContent = errorText;
  }

  set buttonDisabled(value: boolean){
    this.formSubmitButton.disabled = value;
  }
}