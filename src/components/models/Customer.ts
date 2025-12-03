import { TPayment, IBuyer, ValidationErrors } from "../../types";

export class Customer {
    private payment: TPayment; 
    private email: string;
    private phone: string; 
    private address: string;

    constructor() {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    setCustomerData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) {
            this.payment = data.payment;
        }
        if (data.email !== undefined) {
            this.email = data.email;
        }
        if (data.phone !== undefined) {
            this.phone = data.phone;
        }
        if (data.address !== undefined) {
            this.address = data.address;
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
    } 

    validationData(): ValidationErrors {
        const errors: ValidationErrors = {};
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