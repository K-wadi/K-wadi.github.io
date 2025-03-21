// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    displayMenu();
    updateCartCount();
    setupEventListeners();
});

// Display menu items
function displayMenu() {
    const menuContainer = document.getElementById('menu-items');
    menuContainer.innerHTML = menuData.pizzas.map(pizza => `
        <div class="col-md-4 col-sm-6">
            <div class="card menu-item">
                <img src="${pizza.image}" class="card-img-top" alt="${pizza.name}">
                <div class="card-body">
                    <h5 class="card-title">${pizza.name}</h5>
                    <p class="card-text">${pizza.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0">€${pizza.price.toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="addToCart(${pizza.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(pizzaId) {
    const pizza = menuData.pizzas.find(p => p.id === pizzaId);
    const cartItem = cart.find(item => item.id === pizzaId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({
            id: pizza.id,
            name: pizza.name,
            price: pizza.price,
            image: pizza.image,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();
    showToast('Added to cart!');
}

// Update cart count badge
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Display cart items
function displayCart() {
    const cartContainer = document.getElementById('cart-items');
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center">Your cart is empty</p>';
        return;
    }

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h5>${item.name}</h5>
                <div class="quantity-controls">
                    <button class="btn btn-sm btn-outline-secondary btn-quantity" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-secondary btn-quantity" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="text-end ms-3">
                <p class="mb-0">€${(item.price * item.quantity).toFixed(2)}</p>
                <button class="btn btn-sm btn-danger mt-2" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total').textContent = total.toFixed(2);
}

// Update item quantity
function updateQuantity(pizzaId, change) {
    const cartItem = cart.find(item => item.id === pizzaId);
    if (cartItem) {
        cartItem.quantity += change;
        if (cartItem.quantity <= 0) {
            removeFromCart(pizzaId);
        } else {
            saveCart();
            displayCart();
            updateCartCount();
        }
    }
}

// Remove item from cart
function removeFromCart(pizzaId) {
    cart = cart.filter(item => item.id !== pizzaId);
    saveCart();
    displayCart();
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Show toast notification
function showToast(message) {
    // You can implement a toast notification here
    alert(message);
}

// Setup event listeners
function setupEventListeners() {
    // Cart modal
    const cartLink = document.querySelector('a[href="#cart"]');
    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        displayCart();
        new bootstrap.Modal(document.getElementById('cart-modal')).show();
    });

    // Checkout button
    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        
        // Here you would typically handle the checkout process
        alert('Thank you for your order! This is a demo version.');
        cart = [];
        saveCart();
        updateCartCount();
        bootstrap.Modal.getInstance(document.getElementById('cart-modal')).hide();
    });
} 