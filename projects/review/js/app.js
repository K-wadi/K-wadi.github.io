document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    populateCategories();
    displayReviews();
    setupEventListeners();
}

function populateCategories() {
    const categoryFilter = document.getElementById('category-filter');
    const reviewCategory = document.getElementById('review-category');
    
    reviewData.categories.forEach(category => {
        // Add to filter dropdown
        const filterOption = document.createElement('option');
        filterOption.value = category;
        filterOption.textContent = category;
        categoryFilter.appendChild(filterOption);
        
        // Add to review form dropdown
        const formOption = document.createElement('option');
        formOption.value = category;
        formOption.textContent = category;
        reviewCategory.appendChild(formOption);
    });
}

function displayReviews(filterCategory = '', filterRating = '') {
    const reviewsContainer = document.getElementById('reviews-container');
    reviewsContainer.innerHTML = '';
    
    let filteredReviews = [...reviewData.reviews];
    
    if (filterCategory) {
        filteredReviews = filteredReviews.filter(review => review.category === filterCategory);
    }
    
    if (filterRating) {
        filteredReviews = filteredReviews.filter(review => review.rating === parseInt(filterRating));
    }
    
    filteredReviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        reviewsContainer.appendChild(reviewCard);
    });
}

function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'col-md-6 col-lg-4';
    card.innerHTML = `
        <div class="review-card card h-100">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <h5 class="card-title">${review.title}</h5>
                    <span class="category-badge">${review.category}</span>
                </div>
                <div class="review-rating mb-2">
                    ${createStarRating(review.rating)}
                </div>
                <p class="review-content">${review.content}</p>
                <div class="review-meta">
                    <small>By ${review.author} on ${formatDate(review.date)}</small>
                </div>
            </div>
        </div>
    `;
    return card;
}

function createStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="star${i <= rating ? ' active' : ''}" data-rating="${i}">★</i>`;
    }
    return stars;
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function setupEventListeners() {
    // Filter handlers
    const categoryFilter = document.getElementById('category-filter');
    const ratingFilter = document.getElementById('rating-filter');
    
    categoryFilter.addEventListener('change', () => {
        displayReviews(categoryFilter.value, ratingFilter.value);
    });
    
    ratingFilter.addEventListener('change', () => {
        displayReviews(categoryFilter.value, ratingFilter.value);
    });
    
    // Rating system
    const ratingStars = document.querySelectorAll('.rating .star');
    const ratingInput = document.getElementById('review-rating');
    
    ratingStars.forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = e.target.dataset.rating;
            ratingInput.value = rating;
            updateStarDisplay(rating);
        });
    });
    
    // Form submission
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newReview = {
            id: reviewData.reviews.length + 1,
            title: document.getElementById('review-title').value,
            content: document.getElementById('review-content').value,
            rating: parseInt(document.getElementById('review-rating').value),
            category: document.getElementById('review-category').value,
            author: 'Anonymous', // You can add an author input field if needed
            date: new Date().toISOString().split('T')[0]
        };
        
        reviewData.reviews.unshift(newReview);
        displayReviews(categoryFilter.value, ratingFilter.value);
        reviewForm.reset();
        
        // Show success message
        const toast = new bootstrap.Toast(document.getElementById('success-toast'));
        toast.show();
    });
}

function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.rating .star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < rating);
    });
}