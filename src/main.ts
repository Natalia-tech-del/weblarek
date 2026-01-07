import './scss/styles.scss';
import { ProductCatalog } from './components/models/ProductCatalog';
import { ShoppingCart } from './components/models/ShoppingCart';
import { Customer } from './components/models/Customer';
import { Api } from './components/base/Api';
import { WebLarekApi } from './components/communication/WebLarekApi';
import { CDN_URL, API_URL } from './utils/constants';
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
import { ICardFactory, IProduct } from './types';
import { Presenter } from './components/presenter/Presenter';

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

const cardFactory: ICardFactory = {
    createCardBasket(item: IProduct, index: number, onDelete: () => void ): HTMLElement {
        const cardBasketContainer = cloneTemplate('#card-basket');
        const cardBasket = new CardBasket(cardBasketContainer, {
            onClick: onDelete
        });
        return cardBasket.render({...item, index: index + 1});
    },
    createCardCatalog(item: IProduct, onSelect: () => void ): HTMLElement {
         const cardCatalogContainer = cloneTemplate('#card-catalog');
            const cardCatalog = new CardCatalog(cardCatalogContainer, {
                onClick: onSelect
            });
            return cardCatalog.render({...item, image: {src: CDN_URL + item.image.replace(/\.svg$/i, '.png'), alt: item.title}});
    }
}

const presenter = new Presenter(events, webApiModel, customerModel, 
    productsCatalog, shoppingCartModel,
    cardPreview, formContacts, formOrder, basket, gallery,
    header, modal, orderSuccess, cardFactory, CDN_URL
);

presenter.init();