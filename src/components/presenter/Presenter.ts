import { IEvents } from "../base/Events";
import { IWebLarekApi, ICustomer, IProductCatalog, IShoppingCart, IComponent, IModalComponent, ICardFactory } from "../../types";
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
    protected orderSuccess: IComponent,
    protected cardFactory: ICardFactory
  ) {}

  init() {
    this.events.on('cart:changed', () => {
        this.header.render({ counter: this.shoppingCart.getItemsCount()});
    
        const basketItems = this.shoppingCart.getShoppingProducts();
    
        const itemCardsBasket = basketItems.map((item, index) => {
            const handleDelete = () => {
                this.shoppingCart.deleteProductFromCart(item.id);
            }
            return this.cardFactory.createCardBasket(item, index, handleDelete);
        });
        this.basket.render({ basketList: itemCardsBasket,
            basketPrice: this.shoppingCart.getCostShoppingProducts()
         });
    });

    this.events.on('catalog:changed', () => {
        const catalogItems = this.productCatalog.getItems();
        const itemCards = catalogItems.map(item => {
            const handleSelect = () => {
              this.events.emit('card:select', item);
            }
            return this.cardFactory.createCardCatalog(item, handleSelect);
        });
        this.gallery.render({ catalog: itemCards });
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