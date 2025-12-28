import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ShoppingCart {
    private shoppingProducts: IProduct[];

    constructor(protected events: IEvents) {
        this.shoppingProducts = [];
    }
    
    getShoppingProducts(): IProduct[] {
        return this.shoppingProducts;
    }

    addProductToCart(product: IProduct): void {
        this.shoppingProducts.push(product);
        this.events.emit('cart:changed');
    }

    deleteProductFromCart(id: string): void { 
        this.shoppingProducts = this.shoppingProducts.filter((item: IProduct) => item.id !== id);
        this.events.emit('cart:changed');
    }

    clearShoppingCart(): void {
        this.shoppingProducts = [];
        this.events.emit('cart:changed');
    }

    getCostShoppingProducts(): number {
        return this.shoppingProducts.reduce((sum: number, current: IProduct) => {
            return sum + (current.price ?? 0);
          }, 0);
    }

    getItemsCount(): number {
        return this.shoppingProducts.length;
    }

    isProductInCart(id: string): boolean {
        return this.shoppingProducts.some((item: IProduct) => item.id === id);
    }
}