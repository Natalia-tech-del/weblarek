import './scss/styles.scss';
import { ProductCatalog } from './components/models/ProductCatalog';
import { ShoppingCart } from './components/models/ShoppingCart';
import { Customer } from './components/models/Customer';
import { apiProducts } from './utils/data';
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
import { IProduct } from './types';

/*
// проверка рабоспособности класса ProductCatalog
const productsModel = new ProductCatalog();
productsModel.setItems(apiProducts.items); 
console.log('Массив товаров из каталога:', productsModel.getItems());
console.log('Получение товара по его идентификатору:', productsModel.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log('Получение товара по его идентификатору (нет такого):', productsModel.getProductById("4a54-990d-47aa2bb4e7d9"));
console.log('Поолучение товара для подробного отображения (null):', productsModel.getSelectedProduct());
productsModel.selectProduct(apiProducts.items[3]);
console.log('Поолучение товара для подробного отображения:', productsModel.getSelectedProduct());

// проверка рабоспособности класса ShoppingCart
const shoppingCartModel = new ShoppingCart();
shoppingCartModel.addProductToCart(apiProducts.items[1]);
shoppingCartModel.addProductToCart(apiProducts.items[2]);
console.log('Получение массива товаров в корзине', shoppingCartModel.getShoppingProducts());
console.log('Получение стоимости товаров в корзине', shoppingCartModel.getCostShoppingProducts());
console.log('Получение количества товаров в корзине', shoppingCartModel.getItemsCount());
console.log('Проверка наличия товара в корзине (есть такой)', shoppingCartModel.isProductInCart("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
console.log('Проверка наличия товара в корзине (нет такого)', shoppingCartModel.isProductInCart("412bcf81-7e75-4e70-bdb9-d3c73c9803b7"));
shoppingCartModel.deleteProductFromCart("c101ab44-ed99-4a54-990d-47aa2bb4e7d9");
console.log('Получение массива товаров в корзине после удаления 1-го элемента', shoppingCartModel.getShoppingProducts());
console.log('Получение стоимости товаров в корзине после удаления 1-го элемента', shoppingCartModel.getCostShoppingProducts());
console.log('Получение количества товаров в корзине после удаления 1-го элемента', shoppingCartModel.getItemsCount());
shoppingCartModel.clearShoppingCart();
console.log('Получение массива товаров в корзине после очистки', shoppingCartModel.getShoppingProducts());
console.log('Получение стоимости товаров в корзине после очистки', shoppingCartModel.getCostShoppingProducts());
console.log('Получение количества товаров в корзине после очистки', shoppingCartModel.getItemsCount());

// проверка рабоспособности класса Customer
const customerModel = new Customer();
customerModel.setCustomerData({
    payment: 'cash',  
    email: '1@mail.ru'
});
console.log('Вывод данных покупателя', customerModel.getCustomerData());
console.log('Валидация данных', customerModel.validationData());
customerModel.setCustomerData({
    phone: '892064555444'
});
console.log('Вывод данных покупателя', customerModel.getCustomerData());
console.log('Валидация данных', customerModel.validationData());
customerModel.clearCustomerData();
console.log('Вывод данных покупателя после очистки', customerModel.getCustomerData());
console.log('Валидация данных после очистки', customerModel.validationData());

// проверка рабоспособности класса WebLarekApi

const baseApi = new Api(CDN_URL);
const webApiModel = new WebLarekApi(baseApi);
console.log('Используется адрес:', baseApi);
async function loadProducts() {
    try {
        const productsCatalog = new ProductCatalog();
        const productsFromServer = await webApiModel.getProducts();
        console.log('Данные, полученные с сервера', productsFromServer);
        productsCatalog.setItems(productsFromServer); 
        console.log('Массив товаров из каталога с сервера:', productsCatalog.getItems());
        console.log('Получение товара по его идентификатору:', productsCatalog.getProductById("c101ab44-ed99-4a54-990d-47aa2bb4e7d9"));
        console.log('Получение товара по его идентификатору (нет такого):', productsCatalog.getProductById("4a54-990d-47aa2bb4e7d9"));
        console.log('Получение товара для подробного отображения (null):', productsCatalog.getSelectedProduct());
        productsCatalog.selectProduct(productsFromServer[3]);
        console.log('Получение товара для подробного отображения:', productsCatalog.getSelectedProduct());
    } catch (error){
        console.log('Ошибка загрузки', error);
    }
}

loadProducts(); 
*/
/*
// Тестирование компонентов слоя Представления

/* Modal и OrderSuccess
const orderSuccessContainer = cloneTemplate('#success');
const orderSuccess = new OrderSuccess(event, orderSuccessContainer);
orderSuccess.successCost = 3;
modal.content = orderSuccess.render();
*/

// Modal и  FormOrder
/*

*/
/*
// Modal и  FormContacts
const formContactsContainer = cloneTemplate('#contacts') as HTMLFormElement;
const formContacts = new FormContacts(event, formContactsContainer);
formContacts.buttonDisabled = false;
formContacts.email = '';
formContacts.errors = 'dsd';
formContacts.phone = '';
modal.content = formContacts.render();
modal.open();
*/

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
        return cardCatalog.render({...item, image: {src: CDN_URL + item.image, alt: item.title}});
    });
    gallery.render({ catalog: itemCards });
});

events.on('card:select', (item: IProduct) => { 
    productsCatalog.selectProduct(item);
    let buttonText;
    const inCart = shoppingCartModel.isProductInCart(item.id);
    
    if (!item.price) {
        buttonText = 'Недоступно';
    } else  if (inCart) {
        buttonText = "Удалить из корзины";
    } else {
        buttonText = 'Купить';
    }
    modal.render({ content: cardPreview.render({...item, 
        image: {src: CDN_URL + item.image, alt: item.title},
        buttonText,
        buttonDisabled: !item.price
    })})
    modal.open();
});

events.on('modal:close', () => {
    modal.close();
});

events.on('cardPreview:buttonClick', () => {
    const productSelected = productsCatalog.getSelectedProduct();
    
    if (!productSelected) {
        return;
    }

    const inCart = shoppingCartModel.isProductInCart(productSelected.id);

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
  modal.render({ content: formOrder.render()});
});

events.on('order:payment:card', () => {
    customerModel.setCustomerData({payment: 'card'});
});

events.on('order:payment:cash', () => {
    customerModel.setCustomerData({payment: 'cash'});
});

events.on('order:address:change', (data: {address: string}) => {
    customerModel.setCustomerData({address: data.address});
});

events.on('customer:changed', () => {
    let validOrder = ((!customerModel.validationData().address)&&(!customerModel.validationData().payment));
    
    console.log(customerModel.validationData().address, customerModel.validationData().payment, validOrder);
    formOrder.render({
        address: customerModel.getCustomerData().address, 
        payment: customerModel.getCustomerData().payment,
        errors: {address: customerModel.validationData().address, 
                payment: customerModel.validationData().payment
        },
        buttonDisabled: !validOrder
    })

    
});

async function loadProducts() {
    try {
        productsCatalog.setItems(await webApiModel.getProducts()); 
    } catch (error){
        console.error('Ошибка загрузки', error);
    }
}

loadProducts(); 


