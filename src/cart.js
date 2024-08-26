
import { addToStorage, removeFromStorage, isInStorage, getStorageCount } from './storage.js';

const CART_KEY = 'cart'; // ключ для хранения данных корзины

// книги в корзину
export function addToCart(bookId) {
    const wasAdded = addToStorage(CART_KEY, bookId);
    if (wasAdded) {
        updateCartCount(); // обновление  элементов в корзине
    }
    return wasAdded; // true, если элемент был добавлен
}

// удаление книги из корзины
export function removeFromCart(bookId) {
    removeFromStorage(CART_KEY, bookId);
    updateCartCount(); 
}

// проверяем находится ли книга в корзине
export function isBookInCart(bookId) {
    return isInStorage(CART_KEY, bookId);
}

// обновление счетчика элементов в корзине
export function updateCartCount() {
    const count = getStorageCount(CART_KEY);
    document.querySelector('.cart-count').textContent = count;
}


export function initCart() {
    updateCartCount(); 
}
