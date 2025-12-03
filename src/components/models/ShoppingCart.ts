import { IProduct } from "../../types";

export class ShoppingCart {
    private shoppingProducts: IProduct[];

    constructor() {
        this.shoppingProducts = [];
    }
    
    getShoppingProducts(): IProduct[] {
        return this.shoppingProducts;
    }

    addProductToCart(product: IProduct): void {
        this.shoppingProducts.push(product);
    }

    deleteProductFromCart(id: string): void {
        const index: number = this.shoppingProducts.findIndex((item: IProduct) => item.id === id);
        if (index !== -1) {
            this.shoppingProducts.splice(index, 1);
        }    
    }

    clearShoppingCart(): void {
        this.shoppingProducts = [];
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