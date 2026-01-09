import { IEvents } from "../base/Events";
import { IWebLarekApi, ICustomer, IProductCatalog, IShoppingCart, IComponent, 
  IModalComponent, IProduct, IBuyer, IOrder, IOrderSuccess, ICardConstructor } from "../../types";
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
    protected CDN_URL: string,
    protected basketCardTemplate: HTMLTemplateElement,
    protected catalogCardTemplate: HTMLTemplateElement,
    protected cardBasketConstructor: ICardConstructor,
    protected cardCatalogConstructor: ICardConstructor
  ) {}

  init() {
    this.events.on('cart:changed', () => {
        this.header.render({ counter: this.shoppingCart.getItemsCount()});
    
        const basketItems = this.shoppingCart.getShoppingProducts();
    
        const itemCardsBasket = basketItems.map((item, index) => {
            const cardBasketContainer = cloneTemplate(this.basketCardTemplate);
            const cardBasket = new this.cardBasketConstructor(cardBasketContainer, {
                onClick: () => { 
                    this.shoppingCart.deleteProductFromCart(item.id);
                }
            });
            return cardBasket.render({...item, index: index + 1});
            });
        this.basket.render({ basketList: itemCardsBasket,
            basketPrice: this.shoppingCart.getCostShoppingProducts()
         });
    });

    this.events.on('catalog:changed', () => {
        const catalogItems = this.productCatalog.getItems();
        const itemCards = catalogItems.map(item => {
            const cardCatalogContainer = cloneTemplate(this.catalogCardTemplate);
            const cardCatalog = new this.cardCatalogConstructor(cardCatalogContainer, {
                onClick: () => this.events.emit('card:select', item) 
            });
            return cardCatalog.render({...item, image: {src: this.CDN_URL + 
                item.image.replace(/\.svg$/i, '.png'), alt: item.title}});

        });
        this.gallery.render({ catalog: itemCards });
    });

    this.events.on('card:select', (item: IProduct) => { 
        this.productCatalog.selectProduct(item);
    });
    
    this.events.on('selectProduct:changed', () => {
        const data = this.getSelectedProductStatus();
        if (!data) {
            return;
        }
        const {productSelected, inCart} = data;
        let buttonText;
            
        if (!productSelected.price) {
                buttonText = 'Недоступно';
            } else  if (inCart) {
                buttonText = "Удалить из корзины";
            } else {
                buttonText = 'Купить';
            }
            this.modal.render({ content: this.cardPreview.render({...productSelected, 
                image: {src: this.CDN_URL + productSelected.image.replace(/\.svg$/i, '.png'), alt: productSelected.title},
                buttonText,
                buttonDisabled: !productSelected.price
            })});
            this.modal.open();
    });

    this.events.on('cardPreview:buttonClick', () => {
        const data = this.getSelectedProductStatus();
        if (!data) {
            return;
        }
        const {productSelected, inCart} = data;

        if (inCart) {
            this.shoppingCart.deleteProductFromCart(productSelected.id);
        } else {
            this.shoppingCart.addProductToCart(productSelected);
        }
        this.modal.close();
    });

    
    this.events.on('basket:open', () => {
        this.modal.render({ content: this.basket.render()});
        this.modal.open();
    });
    
    this.events.on('basket:checkout', () => {
      this.modal.render({ content: this.formOrder.render({errors: ''})});
    });
    
    this.events.on('form:change', (data: {field: keyof IBuyer, value: string}) => {
        this.customer.setCustomerData({[data.field]: data.value});
    });

    
    this.events.on('customer:changed', (data: {field: string}) => {
        const field = data.field;
        if (field === 'payment' || field === 'address') {
            this.formOrderRender();
        }

        if (field === 'email' || field === 'phone') {
            this.formContactsRender();
        }

        if (field === 'all') {
            this.formOrderRender();
            this.formContactsRender();
        }  
    });

    this.events.on('order:submit', () => {
        this.modal.render({ content: this.formContacts.render({errors: ''})});
    })
    
    this.events.on('contacts:submit', async () => {
        const response = await this.postOrder({...this.customer.getCustomerData(), 
            total: this.shoppingCart.getCostShoppingProducts(),
            items: this.shoppingCart.getShoppingProducts().map(item => {
                return item.id;
            }) 
        }) as IOrderSuccess;
        this.modal.render({ content: this.orderSuccess.render({successCost: response.total})});
        this.customer.clearCustomerData();
        this.shoppingCart.clearShoppingCart();
    })
    
    this.events.on('order:success', () => {
        this.modal.close();
    });

    this.loadProducts();
  }

  protected formOrderRender() {
      const validOrder = ((!this.customer.validationData().address)&&(!this.customer.validationData().payment));
      
      this.formOrder.render({
          address: this.customer.getCustomerData().address, 
          payment: this.customer.getCustomerData().payment,
          errors: {address: this.customer.validationData().address, 
                  payment: this.customer.validationData().payment
          },
          buttonDisabled: !validOrder
      });
  }

  protected formContactsRender() {
      const validContacts = ((!this.customer.validationData().email)&&(!this.customer.validationData().phone));

      this.formContacts.render({
          email: this.customer.getCustomerData().email, 
          phone: this.customer.getCustomerData().phone,
          errors: {email: this.customer.validationData().email, 
                  phone: this.customer.validationData().phone
          },
          buttonDisabled: !validContacts
      });
  }

  protected getSelectedProductStatus() {
      const productSelected = this.productCatalog.getSelectedProduct();
      
      if (!productSelected) {
          return null;
      }

      return {
          productSelected,
          inCart: this.shoppingCart.isProductInCart(productSelected.id)
      }
  }

  protected async loadProducts() {
      try {
          this.productCatalog.setItems(await this.webLarekApi.getProducts()); 
      } catch (error){
          console.error('Ошибка загрузки', error);
      }
  }

  protected async postOrder(data: IOrder) {
      try {
          return await this.webLarekApi.postOrder(data)
      } catch (error){
          console.error('Ошибка отправки', error);
          throw error;
      }
  }
}