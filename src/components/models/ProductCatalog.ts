import { IProduct } from "../../types";
import { IEvents } from "../base/Events";

export class ProductCatalog {
    private products: IProduct[];
    private selectedProduct: IProduct | null;

    constructor(protected events: IEvents) {
        this.products = []; 
        this.selectedProduct = null;
    }

    getItems(): IProduct[] {
        return this.products;  
    }

    setItems(items: IProduct[]): void {
        this.products = items;
        this.events.emit('catalog:changed');
    }

    getProductById(id: string): IProduct | undefined {
        return this.products.find((item: IProduct) => item.id === id);
    }

    selectProduct(product: IProduct): void {
        this.selectedProduct = product;
        this.events.emit('product:selected');
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}
