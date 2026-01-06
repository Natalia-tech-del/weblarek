import { TPayment, IBuyer, IValidationErrors } from "../../types";
import { IEvents } from "../base/Events";

export class Customer {
    private payment: TPayment; 
    private email: string;
    private phone: string; 
    private address: string;

    constructor(protected events: IEvents) {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    setCustomerData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
            this.events.emit('customer:changed', {field: 'payment'});
        }
        if (data.email !== undefined) {
            this.email = data.email;
            this.events.emit('customer:changed', {field: 'email'});
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
            this.events.emit('customer:changed', {field: 'phone'});
        }
        if (data.address !== undefined) {
            this.address = data.address;
            this.events.emit('customer:changed', {field: 'address'});
        }
    }

    getCustomerData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address
        }
    }

    clearCustomerData(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
        this.events.emit('customer:changed', {field: 'all'});
    } 

    validationData(): IValidationErrors {
        const errors: IValidationErrors = {};
        if (this.payment === '') {
          errors.payment = 'Не выбран вид оплаты';
        }
        if (this.email === '') {
          errors.email = 'Укажите емэйл';
        }
        if (this.phone === '') {
          errors.phone = 'Укажите телефон';
        }
        if (this.address === '') {
          errors.address = 'Укажите адрес';
        }
        return errors;
    }
}