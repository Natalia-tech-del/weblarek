import { IEvents } from "../base/Events";
import { IWebLarekApi, ICustomer, IProductCatalog, IShoppingCart, IComponent, IModalComponent } from "../../types";
import { cloneTemplate } from "../../utils/utils";

export class Presenter {

  constructor(
    protected events: IEvents,
    protected webLarekApi: IWebLarekApi,
    protected customer: ICustomer,
    protected productCatalog: IProductCatalog,
    protected shoppingCart: IShoppingCart,
    protected cardPreview: IComponent,
    protected formContacts: IComponent,
    protected formOrder: IComponent,
    protected basket: IComponent,
    protected gallery: IComponent,
    protected header: IComponent,
    protected modal: IModalComponent,
    protected orderSuccess: IComponent
  ) {}

  init() {
    this.events.on('cart:changed', () => {
        this.header.render({ counter: this.shoppingCart.getItemsCount()});
    
        const basketItems = this.shoppingCart.getShoppingProducts();
    
        const itemCardsBasket = basketItems.map((item, index) => {
            const cardBasketContainer = cloneTemplate('#card-basket');
            const cardBasket = new CardBasket(cardBasketContainer, {
                onClick: () => {
                    this.shoppingCart.deleteProductFromCart(item.id);
            }});
            return cardBasket.render({...item, index: index + 1});
        });
        this.basket.render({ basketList: itemCardsBasket,
            basketPrice: this.shoppingCart.getCostShoppingProducts()
         });
    });

    this.loadProducts();
  }

  async loadProducts() {
    try {
        this.productCatalog.setItems(await this.webLarekApi.getProducts()); 
    } catch (error){
        console.error('Ошибка загрузки', error);
    }
  }
}