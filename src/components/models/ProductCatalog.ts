import { IProduct } from "../../types";

export class ProductCatalog {
    private products: IProduct[];
    private selectedProduct: IProduct | null;

    constructor() {
        this.products = []; 
        this.selectedProduct = null;
    }

    getItems(): IProduct[] {
        return this.products;  
    }

    setItems(items: IProduct[]): void {
        this.products = items;
    }

    getProductById(id: string): IProduct | undefined {
        return this.products.find((item: IProduct) => item.id === id);
    }

    selectProduct(product: IProduct): void {
        this.selectedProduct = product;
    }

    getSelectedProduct(): IProduct | null {
        return this.selectedProduct;
    }
}
