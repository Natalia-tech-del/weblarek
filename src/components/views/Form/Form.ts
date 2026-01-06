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

    this.container.addEventListener('input', (evt: Event) => {
      const target = evt.target as HTMLInputElement;
      const field = target.name as keyof T;  // Т - дженерик, который класс Form принимает
      const value = target.value;
      this.onInputChange(field, value);
    });
  }

  protected onInputChange(field: keyof T, value: string) {
    this.events.emit('form:change', {
      field,
      value,
    });
  } 

  set errors(errors: IValidationErrors | '') {
    if (errors === '') {
      this.errorsFormElement.textContent = errors;
      return;
    }
    const errorText = Object.values(errors).filter(e => e).join('; ');
    this.errorsFormElement.textContent = errorText;
  }

  set buttonDisabled(value: boolean){
    this.formSubmitButton.disabled = value;
  }
}