import { generateStars } from './rating.js'; 
import { addToCart, removeFromCart, isBookInCart, initCart } from './cart.js'; 

let currentCategory = 'Architecture'; 
let currentPage = 0; 
const booksPerPage = 6; 

export function initBookLoader() {
    document.addEventListener("DOMContentLoaded", () => { 
        loadBooks(currentCategory); 
        initCart(); 
    });
}

export function loadBooks(category) {
    currentCategory = category; 
    currentPage = 0; 
    document.getElementById('book-list').innerHTML = ''; 
    updateActiveCategory(); 
    fetchBooks(); 
}

function updateActiveCategory() {
    const categories = document.querySelectorAll('#category-list li'); 
    categories.forEach(category => {
        category.classList.remove('active'); 
    });
    const activeCategory = Array.from(categories).find(cat => cat.textContent === currentCategory);
    if (activeCategory) {
        activeCategory.classList.add('active'); 
    }
}

function fetchBooks() {
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${currentCategory}&key=AIzaSyAs-S_oQt6TaTAFvqq6SfaDDZWAtEhXL-4&printType=books&startIndex=${currentPage * booksPerPage}&maxResults=${booksPerPage}&langRestrict=en`; 
    fetch(apiUrl) 
        .then(response => response.json()) 
        .then(data => { 
            const books = data.items || []; 
            books.forEach(book => { 
                const bookHTML = createBookHTML(book); 
                document.getElementById('book-list').insertAdjacentHTML('beforeend', bookHTML); 
            });
            currentPage++; 
            document.getElementById('load-more').style.display = books.length ? 'block' : 'none'; 
        });
}

function createBookHTML(book) {
    const bookId = book.id; 
    const rating = (Math.random() * 5).toFixed(1); 
    const ratingsCount = book.volumeInfo.ratingsCount || Math.floor(Math.random() * 1000) + 1; 
    const description = truncateDescription(book.volumeInfo.description || 'Описание недоступно'); 
    const authors = book.volumeInfo.authors?.join(', ') || 'Неизвестный автор'; 

    const isInCart = isBookInCart(bookId); 
    const buttonClass = isInCart ? 'in-cart' : ''; 
    const buttonText = isInCart ? 'in the cart' : 'Buy Now'; 

    return `
        <div class="book" data-book-id="${bookId}"> 
            <img src="${book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}" alt="${book.volumeInfo.title}" class="book-image"> 
            <div class="book-info">
                <p class="book-authors">Authors: ${authors}</p> 
                <p class="book-title">${book.volumeInfo.title}</p>
                <p class="book-rating">${generateStars(rating)} ${ratingsCount} reviews</p> 
                <p class="book-description">${description}</p>
                <p class="book-price">$${(Math.random() * 20 + 5).toFixed(2)}</p> 
                <button class="buy-button ${buttonClass}">${buttonText}</button> 
            </div>
        </div>
    `; 
}

function truncateDescription(description) {
    const maxLength = 123; 
    if (description.length > maxLength) {
        return description.slice(0, maxLength) + '...'; 
    }
    return description; 
}

document.getElementById('book-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('buy-button')) { 
        const bookElement = event.target.closest('.book'); 
        const bookId = bookElement.dataset.bookId; 

        if (isBookInCart(bookId)) { 
            removeFromCart(bookId); 
            event.target.classList.remove('in-cart'); 
            event.target.textContent = 'Buy Now';
        } else { 
            addToCart(bookId); 
            event.target.classList.add('in-cart');
            event.target.textContent = 'IN THE CART'; 
        }
    }
});

export function loadMoreBooks() {
    fetchBooks(); 
}
