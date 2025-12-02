import { IProduct } from "../../types";

export class ProductCatalog {
    private products: IProduct[];
    private selectedProduct: IProduct | null;

    constructor() {
        this.products = []; 
        this.selectedProduct = null;
    }

    getItems(): IProduct[];
    setItems(items: IProduct[]): void;
    getProductById(id: string): IProduct | undefined;
    selectProduct(product: IProduct): void;
    getSelectedProduct(): IProduct | null;


}
