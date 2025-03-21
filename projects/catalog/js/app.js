// Configuration
const config = {
    productsPerPage: 12,
    loadMoreIncrement: 8,
    achievementNotificationDuration: 3000,
    filterDebounceTime: 300
};

// State Management
const state = {
    products: [],
    filteredProducts: [],
    displayedProducts: [],
    cart: [],
    wishlist: [],
    achievements: {
        firstPurchase: { unlocked: false, title: 'First Purchase', description: 'Make your first purchase', icon: 'bi-bag-check' },
        bigSpender: { unlocked: false, title: 'Big Spender', description: 'Spend over $500 in total', icon: 'bi-cash-coin' },
        collector: { unlocked: false, title: 'Collector', description: 'Add 5 items to wishlist', icon: 'bi-heart' },
        loyal: { unlocked: false, title: 'Loyal Customer', description: 'Make 5 purchases', icon: 'bi-award' }
    },
    filters: {
        search: '',
        brand: 'all',
        priceRange: 'all',
        sort: 'featured'
    },
    stats: {
        totalSpent: 0,
        purchaseCount: 0
    },
    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
};

// DOM Elements
const elements = {
    productGrid: document.getElementById('product-grid'),
    searchInput: document.getElementById('search-input'),
    brandFilter: document.getElementById('brand-filter'),
    priceFilter: document.getElementById('price-filter'),
    sortFilter: document.getElementById('sort-filter'),
    activeFilters: document.getElementById('active-filters'),
    loadMoreBtn: document.getElementById('load-more'),
    cartCount: document.getElementById('cart-count'),
    wishlistCount: document.getElementById('wishlist-count'),
    darkModeToggle: document.getElementById('dark-mode-toggle'),
    achievementsList: document.getElementById('achievements-list'),
    cartItems: document.getElementById('cart-items'),
    cartTotal: document.getElementById('cart-total'),
    wishlistItems: document.getElementById('wishlist-items')
};

// Event Listeners
function initializeEventListeners() {
    elements.searchInput.addEventListener('input', debounce(handleSearch, config.filterDebounceTime));
    elements.brandFilter.addEventListener('change', handleFilterChange);
    elements.priceFilter.addEventListener('change', handleFilterChange);
    elements.sortFilter.addEventListener('change', handleSort);
    elements.loadMoreBtn.addEventListener('click', loadMoreProducts);
    elements.darkModeToggle.addEventListener('click', toggleDarkMode);

    // Product Grid Event Delegation
    elements.productGrid.addEventListener('click', handleProductGridClick);
}

// Product Grid Event Handler
function handleProductGridClick(e) {
    const productCard = e.target.closest('.product-card');
    if (!productCard) return;

    const productId = productCard.dataset.id;
    const action = e.target.closest('[data-action]')?.dataset.action;

    if (action === 'quickview') {
        showProductModal(productId);
    } else if (action === 'wishlist') {
        toggleWishlist(productId);
    }
}

// Filter Handlers
function handleSearch(e) {
    state.filters.search = e.target.value.toLowerCase();
    updateActiveFilters();
    filterProducts();
}

function handleFilterChange(e) {
    const { id, value } = e.target;
    state.filters[id.replace('-filter', '')] = value;
    updateActiveFilters();
    filterProducts();
}

function handleSort() {
    const sortValue = elements.sortFilter.value;
    state.filters.sort = sortValue;
    sortProducts();
    renderProducts();
}

// Filter Products
function filterProducts() {
    state.filteredProducts = state.products.filter(product => {
        const searchMatch = product.name.toLowerCase().includes(state.filters.search) ||
                          product.brand.toLowerCase().includes(state.filters.search);
        const brandMatch = state.filters.brand === 'all' || product.brand === state.filters.brand;
        const priceMatch = matchPriceRange(product.price, state.filters.priceRange);
        
        return searchMatch && brandMatch && priceMatch;
    });

    sortProducts();
    renderProducts(true);
}

// Sort Products
function sortProducts() {
    const { sort } = state.filters;
    
    state.filteredProducts.sort((a, b) => {
        switch (sort) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name);
            default: // featured
                return b.featured - a.featured;
        }
    });
}

// Render Functions
function renderProducts(reset = false) {
    if (reset) {
        state.displayedProducts = state.filteredProducts.slice(0, config.productsPerPage);
        elements.productGrid.innerHTML = '';
    }

    const fragment = document.createDocumentFragment();

    state.displayedProducts.forEach(product => {
        const card = createProductCard(product);
        fragment.appendChild(card);
    });

    elements.productGrid.appendChild(fragment);
    updateLoadMoreButton();
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-md-4 col-lg-3 mb-4';
    card.innerHTML = `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="overlay-btn" data-action="quickview">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="overlay-btn ${state.wishlist.includes(product.id) ? 'active' : ''}" data-action="wishlist">
                        <i class="bi bi-heart${state.wishlist.includes(product.id) ? '-fill' : ''}"></i>
                    </button>
                </div>
            </div>
            <div class="product-details">
                <div class="product-brand">${product.brand}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${product.originalPrice ? `
                        <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                        <span class="discount-badge">-${Math.round((1 - product.price/product.originalPrice) * 100)}%</span>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    return card;
}

// Cart Functions
function addToCart(productId) {
    const product = state.products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = state.cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        state.cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast('Product added to cart');
    checkAchievements();
}

function updateCartUI() {
    elements.cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (elements.cartItems) {
        renderCartItems();
        updateCartTotal();
    }
}

function renderCartItems() {
    elements.cartItems.innerHTML = state.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h6 class="cart-item-title">${item.name}</h6>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="quantity-controls">
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
            </div>
            <button class="btn btn-link text-danger" onclick="removeFromCart('${item.id}')">
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `).join('');
}

// Wishlist Functions
function toggleWishlist(productId) {
    const index = state.wishlist.indexOf(productId);
    if (index === -1) {
        state.wishlist.push(productId);
        showToast('Added to wishlist');
    } else {
        state.wishlist.splice(index, 1);
        showToast('Removed from wishlist');
    }

    updateWishlistUI();
    checkAchievements();
}

function updateWishlistUI() {
    elements.wishlistCount.textContent = state.wishlist.length;
    
    if (elements.wishlistItems) {
        renderWishlistItems();
    }

    // Update wishlist buttons in product grid
    document.querySelectorAll(`[data-action="wishlist"]`).forEach(btn => {
        const productId = btn.closest('.product-card').dataset.id;
        const isWishlisted = state.wishlist.includes(productId);
        btn.classList.toggle('active', isWishlisted);
        btn.querySelector('i').className = `bi bi-heart${isWishlisted ? '-fill' : ''}`;
    });
}

// Achievement System
function checkAchievements() {
    const { achievements, stats, wishlist } = state;

    if (!achievements.firstPurchase.unlocked && stats.purchaseCount > 0) {
        unlockAchievement('firstPurchase');
    }

    if (!achievements.bigSpender.unlocked && stats.totalSpent >= 500) {
        unlockAchievement('bigSpender');
    }

    if (!achievements.collector.unlocked && wishlist.length >= 5) {
        unlockAchievement('collector');
    }

    if (!achievements.loyal.unlocked && stats.purchaseCount >= 5) {
        unlockAchievement('loyal');
    }
}

function unlockAchievement(id) {
    const achievement = state.achievements[id];
    if (!achievement || achievement.unlocked) return;

    achievement.unlocked = true;
    showAchievementNotification(achievement);
    updateAchievementsUI();
    saveProgress();
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification animate__animated animate__slideInUp';
    notification.innerHTML = `
        <i class="bi ${achievement.icon}"></i>
        <div>
            <strong>${achievement.title}</strong>
            <small>${achievement.description}</small>
        </div>
    `;

    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.replace('animate__slideInUp', 'animate__slideOutDown');
        setTimeout(() => notification.remove(), 1000);
    }, config.achievementNotificationDuration);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function matchPriceRange(price, range) {
    switch (range) {
        case 'under-50': return price < 50;
        case '50-100': return price >= 50 && price <= 100;
        case '100-200': return price > 100 && price <= 200;
        case 'over-200': return price > 200;
        default: return true;
    }
}

function showToast(message) {
    const toast = new bootstrap.Toast(document.getElementById('toast'));
    document.getElementById('toast-message').textContent = message;
    toast.show();
}

function toggleDarkMode() {
    state.darkMode = !state.darkMode;
    document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    elements.darkModeToggle.innerHTML = `<i class="bi bi-${state.darkMode ? 'sun' : 'moon'}"></i>`;
    saveProgress();
}

// Progress Management
function saveProgress() {
    const progress = {
        cart: state.cart,
        wishlist: state.wishlist,
        achievements: state.achievements,
        stats: state.stats,
        darkMode: state.darkMode
    };
    localStorage.setItem('catalogProgress', JSON.stringify(progress));
}

function loadProgress() {
    const progress = JSON.parse(localStorage.getItem('catalogProgress'));
    if (progress) {
        state.cart = progress.cart || [];
        state.wishlist = progress.wishlist || [];
        state.achievements = progress.achievements || state.achievements;
        state.stats = progress.stats || state.stats;
        state.darkMode = progress.darkMode;

        updateCartUI();
        updateWishlistUI();
        updateAchievementsUI();
        document.documentElement.setAttribute('data-theme', state.darkMode ? 'dark' : 'light');
    }
}

// Initialize
async function initialize() {
    try {
        const response = await fetch('data/products.json');
        state.products = await response.json();
        state.filteredProducts = [...state.products];
        
        loadProgress();
        initializeEventListeners();
        renderProducts();
        
    } catch (error) {
        console.error('Failed to initialize the catalog:', error);
        showToast('Failed to load products. Please try again later.');
    }
}

// Start the application
document.addEventListener('DOMContentLoaded', initialize); 