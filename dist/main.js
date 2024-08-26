/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://bookshop/./src/style.scss?");

/***/ }),

/***/ "./src/bookLoader.js":
/*!***************************!*\
  !*** ./src/bookLoader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initBookLoader: () => (/* binding */ initBookLoader),\n/* harmony export */   loadBooks: () => (/* binding */ loadBooks),\n/* harmony export */   loadMoreBooks: () => (/* binding */ loadMoreBooks)\n/* harmony export */ });\n/* harmony import */ var _rating_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rating.js */ \"./src/rating.js\");\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cart.js */ \"./src/cart.js\");\n \r\n \r\n\r\nlet currentCategory = 'Architecture'; \r\nlet currentPage = 0; \r\nconst booksPerPage = 6; \r\n\r\nfunction initBookLoader() {\r\n    document.addEventListener(\"DOMContentLoaded\", () => { \r\n        loadBooks(currentCategory); \r\n        (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.initCart)(); \r\n    });\r\n}\r\n\r\nfunction loadBooks(category) {\r\n    currentCategory = category; \r\n    currentPage = 0; \r\n    document.getElementById('book-list').innerHTML = ''; \r\n    updateActiveCategory(); \r\n    fetchBooks(); \r\n}\r\n\r\nfunction updateActiveCategory() {\r\n    const categories = document.querySelectorAll('#category-list li'); \r\n    categories.forEach(category => {\r\n        category.classList.remove('active'); \r\n    });\r\n    const activeCategory = Array.from(categories).find(cat => cat.textContent === currentCategory);\r\n    if (activeCategory) {\r\n        activeCategory.classList.add('active'); \r\n    }\r\n}\r\n\r\nfunction fetchBooks() {\r\n    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${currentCategory}&key=AIzaSyAs-S_oQt6TaTAFvqq6SfaDDZWAtEhXL-4&printType=books&startIndex=${currentPage * booksPerPage}&maxResults=${booksPerPage}&langRestrict=en`; \r\n    fetch(apiUrl) \r\n        .then(response => response.json()) \r\n        .then(data => { \r\n            const books = data.items || []; \r\n            books.forEach(book => { \r\n                const bookHTML = createBookHTML(book); \r\n                document.getElementById('book-list').insertAdjacentHTML('beforeend', bookHTML); \r\n            });\r\n            currentPage++; \r\n            document.getElementById('load-more').style.display = books.length ? 'block' : 'none'; \r\n        });\r\n}\r\n\r\nfunction createBookHTML(book) {\r\n    const bookId = book.id; \r\n    const rating = (Math.random() * 5).toFixed(1); \r\n    const ratingsCount = book.volumeInfo.ratingsCount || Math.floor(Math.random() * 1000) + 1; \r\n    const description = truncateDescription(book.volumeInfo.description || 'Описание недоступно'); \r\n    const authors = book.volumeInfo.authors?.join(', ') || 'Неизвестный автор'; \r\n\r\n    const isInCart = (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.isBookInCart)(bookId); \r\n    const buttonClass = isInCart ? 'in-cart' : ''; \r\n    const buttonText = isInCart ? 'in the cart' : 'Buy Now'; \r\n\r\n    return `\r\n        <div class=\"book\" data-book-id=\"${bookId}\"> \r\n            <img src=\"${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}\" alt=\"${book.volumeInfo.title}\" class=\"book-image\"> \r\n            <div class=\"book-info\">\r\n                <p class=\"book-authors\">Authors: ${authors}</p> \r\n                <p class=\"book-title\">${book.volumeInfo.title}</p>\r\n                <p class=\"book-rating\">${(0,_rating_js__WEBPACK_IMPORTED_MODULE_0__.generateStars)(rating)} ${ratingsCount} reviews</p> \r\n                <p class=\"book-description\">${description}</p>\r\n                <p class=\"book-price\">$${(Math.random() * 20 + 5).toFixed(2)}</p> \r\n                <button class=\"buy-button ${buttonClass}\">${buttonText}</button> \r\n            </div>\r\n        </div>\r\n    `; \r\n}\r\n\r\nfunction truncateDescription(description) {\r\n    const maxLength = 123; \r\n    if (description.length > maxLength) {\r\n        return description.slice(0, maxLength) + '...'; \r\n    }\r\n    return description; \r\n}\r\n\r\ndocument.getElementById('book-list').addEventListener('click', function(event) {\r\n    if (event.target.classList.contains('buy-button')) { \r\n        const bookElement = event.target.closest('.book'); \r\n        const bookId = bookElement.dataset.bookId; \r\n\r\n        if ((0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.isBookInCart)(bookId)) { \r\n            (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.removeFromCart)(bookId); \r\n            event.target.classList.remove('in-cart'); \r\n            event.target.textContent = 'Buy Now';\r\n        } else { \r\n            (0,_cart_js__WEBPACK_IMPORTED_MODULE_1__.addToCart)(bookId); \r\n            event.target.classList.add('in-cart');\r\n            event.target.textContent = 'IN THE CART'; \r\n        }\r\n    }\r\n});\r\n\r\nfunction loadMoreBooks() {\r\n    fetchBooks(); \r\n}\r\n\n\n//# sourceURL=webpack://bookshop/./src/bookLoader.js?");

/***/ }),

/***/ "./src/cart.js":
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToCart: () => (/* binding */ addToCart),\n/* harmony export */   initCart: () => (/* binding */ initCart),\n/* harmony export */   isBookInCart: () => (/* binding */ isBookInCart),\n/* harmony export */   removeFromCart: () => (/* binding */ removeFromCart),\n/* harmony export */   updateCartCount: () => (/* binding */ updateCartCount)\n/* harmony export */ });\n/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ \"./src/storage.js\");\n\r\n\r\n\r\nconst CART_KEY = 'cart'; // ключ для хранения данных корзины\r\n\r\n// книги в корзину\r\nfunction addToCart(bookId) {\r\n    const wasAdded = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.addToStorage)(CART_KEY, bookId);\r\n    if (wasAdded) {\r\n        updateCartCount(); // обновление  элементов в корзине\r\n    }\r\n    return wasAdded; // true, если элемент был добавлен\r\n}\r\n\r\n// удаление книги из корзины\r\nfunction removeFromCart(bookId) {\r\n    (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.removeFromStorage)(CART_KEY, bookId);\r\n    updateCartCount(); \r\n}\r\n\r\n// проверяем находится ли книга в корзине\r\nfunction isBookInCart(bookId) {\r\n    return (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.isInStorage)(CART_KEY, bookId);\r\n}\r\n\r\n// обновление счетчика элементов в корзине\r\nfunction updateCartCount() {\r\n    const count = (0,_storage_js__WEBPACK_IMPORTED_MODULE_0__.getStorageCount)(CART_KEY);\r\n    document.querySelector('.cart-count').textContent = count;\r\n}\r\n\r\n\r\nfunction initCart() {\r\n    updateCartCount(); \r\n}\r\n\n\n//# sourceURL=webpack://bookshop/./src/cart.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _slider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slider.js */ \"./src/slider.js\");\n/* harmony import */ var _bookLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bookLoader.js */ \"./src/bookLoader.js\");\n/* harmony import */ var _rating_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rating.js */ \"./src/rating.js\");\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cart.js */ \"./src/cart.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n(0,_slider_js__WEBPACK_IMPORTED_MODULE_1__.initSlider)();\r\n\r\n(0,_bookLoader_js__WEBPACK_IMPORTED_MODULE_2__.initBookLoader)();\r\n\r\n(0,_cart_js__WEBPACK_IMPORTED_MODULE_4__.initCart)();\r\n(0,_rating_js__WEBPACK_IMPORTED_MODULE_3__.generateStars)()\r\n\r\n// загрузка дополнительных книг при нажатии на кнопку load-more\r\ndocument.getElementById(\"load-more\").addEventListener(\"click\", _bookLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMoreBooks);\r\n\r\n// обработчики кликов для категорий\r\nconst categories = document.querySelectorAll(\"#category-list li\");\r\ncategories.forEach((category) => {\r\n  category.addEventListener(\"click\", () => {\r\n    (0,_bookLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadBooks)(category.dataset.category);\r\n  });\r\n});\r\n\r\n// обработчики кликов для точек слайдера\r\nconst dots = document.querySelectorAll(\".dot\");\r\ndots.forEach((dot, index) => {\r\n  dot.addEventListener(\"click\", () => {\r\n    (0,_slider_js__WEBPACK_IMPORTED_MODULE_1__.currentSlide)(index + 1);\r\n  });\r\n});\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/index.js?");

/***/ }),

/***/ "./src/rating.js":
/*!***********************!*\
  !*** ./src/rating.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateStars: () => (/* binding */ generateStars)\n/* harmony export */ });\nfunction generateStars(rating) {\r\n    const stars = Math.round(rating); \r\n    let starHTML = '';\r\n    for (let i = 0; i < 5; i++) {\r\n        if (i < stars) {\r\n            starHTML += `<span class=\"filled\">★</span>`; \r\n        } else {\r\n            starHTML += `<span class=\"empty\">☆</span>`; \r\n        }\r\n    }\r\n    return starHTML;\r\n}\r\n\n\n//# sourceURL=webpack://bookshop/./src/rating.js?");

/***/ }),

/***/ "./src/slider.js":
/*!***********************!*\
  !*** ./src/slider.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   currentSlide: () => (/* binding */ currentSlide),\n/* harmony export */   initSlider: () => (/* binding */ initSlider)\n/* harmony export */ });\nlet slideIndex = 0;\r\n\r\nfunction initSlider() {\r\n    document.addEventListener(\"DOMContentLoaded\", () => {\r\n        showSlides();\r\n    });\r\n}\r\n\r\nfunction currentSlide(n) {\r\n    slideIndex = n - 1;\r\n    showSlides();\r\n}\r\n\r\nfunction showSlides() {\r\n    let i;\r\n    let slides = document.getElementsByClassName(\"slide\");\r\n    let dots = document.getElementsByClassName(\"dot\");\r\n    for (i = 0; i < slides.length; i++) {\r\n        slides[i].style.display = \"none\";\r\n    }\r\n    slideIndex++;\r\n    if (slideIndex > slides.length) { slideIndex = 1 }\r\n    for (i = 0; i < dots.length; i++) {\r\n        dots[i].className = dots[i].className.replace(\" active\", \"\");\r\n    }\r\n    slides[slideIndex - 1].style.display = \"block\";\r\n    dots[slideIndex - 1].className += \" active\";\r\n    setTimeout(showSlides, 5000);\r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://bookshop/./src/slider.js?");

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addToStorage: () => (/* binding */ addToStorage),\n/* harmony export */   getFromStorage: () => (/* binding */ getFromStorage),\n/* harmony export */   getStorageCount: () => (/* binding */ getStorageCount),\n/* harmony export */   isInStorage: () => (/* binding */ isInStorage),\n/* harmony export */   removeFromStorage: () => (/* binding */ removeFromStorage)\n/* harmony export */ });\n\r\nfunction getFromStorage(key) {\r\n    return JSON.parse(localStorage.getItem(key)) || [];\r\n}\r\n\r\n// Добавление данных в localStorage\r\nfunction addToStorage(key, value) {\r\n    const storedData = getFromStorage(key);\r\n    if (!storedData.includes(value)) {\r\n        storedData.push(value);\r\n        localStorage.setItem(key, JSON.stringify(storedData));\r\n        return true; //  true, если элемент был добавлен\r\n    }\r\n    return false; //  false, если элемент уже существует\r\n}\r\n\r\n// удаление данных из localStorage\r\nfunction removeFromStorage(key, value) {\r\n    let storedData = getFromStorage(key);\r\n    storedData = storedData.filter(item => item !== value);\r\n    localStorage.setItem(key, JSON.stringify(storedData));\r\n}\r\n\r\n// проверка наличия элемента в localStorage\r\nfunction isInStorage(key, value) {\r\n    const storedData = getFromStorage(key);\r\n    return storedData.includes(value);\r\n}\r\n\r\n// получение количества элементов в localStorage\r\nfunction getStorageCount(key) {\r\n    return getFromStorage(key).length;\r\n}\r\n\n\n//# sourceURL=webpack://bookshop/./src/storage.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;