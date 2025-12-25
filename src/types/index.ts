import { categoryMap } from "../utils/constants";
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = 'card' | 'cash' | '';

export interface IProduct {
    id: string;           // уникальный идентификатор товара
    description: string;  // подробное описание товара
    image: string;        // путь к изображению для карточки товара
    title: string;        // название товара
    category: string;     // группа, к которой относится товар
    price: number | null; // цена товара
}

export interface IBuyer {
    payment: TPayment;   // способ оплаты
    email: string;       // электронная почта покупателя
    phone: string;       // телефон покупателя
    address: string;     // адрес доставки
}

export interface IProductResponse {
    total: number;       // количество товаров в каталоге
    items: IProduct[];     // массив товаров в каталоге
}

export interface IOrder extends IBuyer {
    total: number;       // общая сумма заказа
    items: string[];     // массив идентификаторов заказанных товаров
}

export interface IOrderSuccess {
    id: string;          // id заказа
    total: number;       // общая стоимость заказа от сервера
}

export interface IOrderError {
    error: string;       // ошибка
}

export type IResultOrder = IOrderSuccess | IOrderError;

export interface IValidationErrors {
    payment?: string;     // ошибка для поля: способ оплаты
    email?: string;       // ошибка для поля: электронная почта покупателя
    phone?: string;       // ошибка для поля: телефон покупателя
    address?: string;     // ошибка для поля: адрес доставки
}

export interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export type CategoryKey = keyof typeof categoryMap;

