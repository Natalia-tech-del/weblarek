import { IApi, IOrder, IResultOrder, IProduct, IProductResponse} from "../../types";

export class WebLarekApi{
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    async getProducts(): Promise<IProduct[]> {
        const response = await this.api.get<IProductResponse>('/product/');
        return response.items;
    }

    async postOrder(data: IOrder): Promise<IResultOrder> {
        return await this.api.post<IResultOrder>('/order/', data);
    }
}