import './scss/styles.scss';
import { ProductCatalog } from './components/models/ProductCatalog';
import { ShoppingCart } from './components/models/ShoppingCart';
import { Customer } from './components/models/Customer';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/communication/WebLarekApi';
import { CDN_URL, API_URL } from './utils/constants'
import { Header } from './components/views/Header';
import { Gallery } from './components/views/Gallery';
import { EventEmitter } from './components/base/Events';
import { Modal } from './components/views/Modal';
import { cloneTemplate } from './utils/utils';
import { OrderSuccess } from './components/views/OrderSuccess';
import { CardCatalog } from './components/views/Card/СardСatalog';
import { CardPreview } from './components/views/Card/CardPreview';
import { CardBasket } from './components/views/Card/CardBasket';
import { Basket } from './components/views/Basket';
import { FormOrder } from './components/views/Form/FormOrder';
import { FormContacts } from './components/views/Form/FormContacts';
import { IBuyer, IOrder, IOrderSuccess, IProduct } from './types';

const baseApi = new Api(API_URL);
const webApiModel = new WebLarekApi(baseApi);

const events = new EventEmitter();

const productsCatalog = new ProductCatalog(events);
const shoppingCartModel = new ShoppingCart(events);
const customerModel = new Customer(events);

const modalContainer = document.querySelector('.modal') as HTMLElement;
const modal = new Modal(events, modalContainer);

const headerContainer = document.querySelector('header.header') as HTMLElement;
const header = new Header(events, headerContainer);

const galleryContainer = document.querySelector('main.gallery') as HTMLElement;
const gallery = new Gallery(galleryContainer);

const cardPreviewContainer = cloneTemplate('#card-preview');
const cardPreview = new CardPreview(events, cardPreviewContainer);

const basketContainer = cloneTemplate('#basket');
const basket = new Basket(events, basketContainer);

const formOrderContainer = cloneTemplate('#order') as HTMLFormElement;
const formOrder = new FormOrder(events, formOrderContainer);

const formContactsContainer = cloneTemplate('#contacts') as HTMLFormElement;
const formContacts = new FormContacts(events, formContactsContainer);

const orderSuccessContainer = cloneTemplate('#success');
const orderSuccess = new OrderSuccess(events, orderSuccessContainer);

events.on('cart:changed', () => {
    header.render({ counter: shoppingCartModel.getItemsCount()});

    const basketItems = shoppingCartModel.getShoppingProducts();

    const itemCardsBasket = basketItems.map((item, index) => {
        const cardBasketContainer = cloneTemplate('#card-basket');
        const cardBasket = new CardBasket(cardBasketContainer, {
            onClick: () => {
                shoppingCartModel.deleteProductFromCart(item.id);
        }});
        return cardBasket.render({...item, index: index + 1});
    });
    basket.render({ basketList: itemCardsBasket,
        basketPrice: shoppingCartModel.getCostShoppingProducts()
     });
});

events.on('catalog:changed', () => {
    const catalogItems = productsCatalog.getItems();
   	const itemCards = catalogItems.map(item => {
        const cardCatalogContainer = cloneTemplate('#card-catalog');
        const cardCatalog = new CardCatalog(cardCatalogContainer, {
            onClick: () => events.emit('card:select', item)
        });
        return cardCatalog.render({...item, image: {src: CDN_URL + item.image.replace(/\.svg$/i, '.png'), alt: item.title}});
    });
    gallery.render({ catalog: itemCards });
});

events.on('card:select', (item: IProduct) => { 
    productsCatalog.selectProduct(item);
});

events.on('selectProduct:changed', () => {
    const data = getSelectedProductStatus();
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
        modal.render({ content: cardPreview.render({...productSelected, 
            image: {src: CDN_URL + productSelected.image.replace(/\.svg$/i, '.png'), alt: productSelected.title},
            buttonText,
            buttonDisabled: !productSelected.price
        })});
        modal.open();
});

const getSelectedProductStatus = () => {
    const productSelected = productsCatalog.getSelectedProduct();
    
    if (!productSelected) {
        return null;
    }

    return {
        productSelected,
        inCart: shoppingCartModel.isProductInCart(productSelected.id)
    }
}

events.on('cardPreview:buttonClick', () => {
    const data = getSelectedProductStatus();
    if (!data) {
        return;
    }
    const {productSelected, inCart} = data;

    if (inCart) {
        shoppingCartModel.deleteProductFromCart(productSelected.id);
    } else {
        shoppingCartModel.addProductToCart(productSelected);
    }
    modal.close();
});

events.on('basket:open', () => {
    modal.render({ content: basket.render()});
    modal.open();
});

events.on('basket:checkout', () => {
  modal.render({ content: formOrder.render({errors: ''})});
});

events.on('form:change', (data: {field: keyof IBuyer, value: string}) => {
    customerModel.setCustomerData({[data.field]: data.value});
});

events.on('customer:changed', (data: {field: string}) => {
    const field = data.field;
    if (field === 'payment' || field === 'address') {
        formOrderRender();
    }

    if (field === 'email' || field === 'phone') {
        formContactsRender();
    }

    if (field === 'all') {
        formOrderRender();
        formContactsRender();
    }  
});

function formOrderRender() {
    const validOrder = ((!customerModel.validationData().address)&&(!customerModel.validationData().payment));
    
    formOrder.render({
        address: customerModel.getCustomerData().address, 
        payment: customerModel.getCustomerData().payment,
        errors: {address: customerModel.validationData().address, 
                payment: customerModel.validationData().payment
        },
        buttonDisabled: !validOrder
    });
}

function formContactsRender() {
    const validContacts = ((!customerModel.validationData().email)&&(!customerModel.validationData().phone));

    formContacts.render({
        email: customerModel.getCustomerData().email, 
        phone: customerModel.getCustomerData().phone,
        errors: {email: customerModel.validationData().email, 
                phone: customerModel.validationData().phone
        },
        buttonDisabled: !validContacts
    });
}

events.on('order:submit', () => {
    modal.render({ content: formContacts.render({errors: ''})});
})

events.on('contacts:submit', async () => {
    const response = await postOrder({...customerModel.getCustomerData(), 
        total: shoppingCartModel.getCostShoppingProducts(),
        items: shoppingCartModel.getShoppingProducts().map(item => {
            return item.id;
        }) 
    }) as IOrderSuccess;
    modal.render({ content: orderSuccess.render({successCost: response.total})});
    customerModel.clearCustomerData();
    shoppingCartModel.clearShoppingCart();
})

events.on('order:success', () => {
    modal.close();
});

async function loadProducts() {
    try {
        productsCatalog.setItems(await webApiModel.getProducts()); 
    } catch (error){
        console.error('Ошибка загрузки', error);
    }
}

async function postOrder(data:IOrder) {
    try {
        return await webApiModel.postOrder(data)
    } catch (error){
        console.error('Ошибка отправки', error);
        throw error;
    }
}

loadProducts();
