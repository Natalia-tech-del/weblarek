import './scss/styles.scss';
import { ProductCatalog } from './components/models/ProductCatalog';
import { ShoppingCart } from './components/models/ShoppingCart';
import { Customer } from './components/models/Customer';
import { apiProducts } from './utils/data';

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

