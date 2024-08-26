
import "./style.scss";


import { initSlider, currentSlide } from "./slider.js";
import { initBookLoader, loadBooks, loadMoreBooks } from "./bookLoader.js";
import { generateStars } from "./rating.js";
import { initCart } from "./cart.js";

initSlider();

initBookLoader();

initCart();
generateStars()

// загрузка дополнительных книг при нажатии на кнопку load-more
document.getElementById("load-more").addEventListener("click", loadMoreBooks);

// обработчики кликов для категорий
const categories = document.querySelectorAll("#category-list li");
categories.forEach((category) => {
  category.addEventListener("click", () => {
    loadBooks(category.dataset.category);
  });
});

// обработчики кликов для точек слайдера
const dots = document.querySelectorAll(".dot");
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentSlide(index + 1);
  });
});




