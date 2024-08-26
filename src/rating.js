export function generateStars(rating) {
    const stars = Math.round(rating); 
    let starHTML = '';
    for (let i = 0; i < 5; i++) {
        if (i < stars) {
            starHTML += `<span class="filled">★</span>`; 
        } else {
            starHTML += `<span class="empty">☆</span>`; 
        }
    }
    return starHTML;
}
