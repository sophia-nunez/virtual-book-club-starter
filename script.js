const DOMContentLoaded = document.addEventListener('DOMContentLoaded', () => {
    loadReviews();
    
    const form = document.getElementById('review-form');
    
    form.addEventListener('submit', (event) => {
        handleReviewSubmit(event);
    })
}) 

function loadReviews() {
    console.log("reviews loaded");

    fetch('reviews.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(reviews => {
            console.log(reviews);
            reviews.forEach(review => {
                const reviewList = document.getElementById('reviews-list');
                reviewList.appendChild(createReviewElement(review));
            })
        })
        .catch(error => {
            console.error('There was a problem:', error);
        });
}

function handleReviewSubmit(event) {
    event.preventDefault();

    const title = document.getElementById('book-title').value;
    const review = document.getElementById('review-text').value;
    const rating = document.getElementById('rating').value;

    const newReview = {
        title,
        review,
        rating,
        id: 6 // TODO: make this unique for each added
    }

    const reviewList = document.getElementById('reviews-list');
    reviewList.insertBefore(createReviewElement(newReview), reviewList.firstChild);

    console.log("reviewsubmit handled");
}

function createReviewElement(review) {
    console.log(review);
    const reviewCard = document.createElement('div');
    reviewCard.className = "review-item";

    reviewCard.innerHTML =
        `
            <h3>${review.title}</h3>
            <p>${review.reviewText}</p>
            <p>Rating: ${review.rating}</p>
            <button data-id=${review.id} data-liked="false" onclick="toggleLike()">Like (${review.likes})</button>
            <button data-id=${review.id} onclick="repostReview()">Repost (${review.reposts})</button>
        `;

    return reviewCard;
}

function toggleLike() {
    console.log('Like button clicked');
}

function repostReview() {
    console.log('Repost button clicked');
}