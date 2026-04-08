// Product Database
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.5,
        reviews: 2845,
        emoji: "🎧"
    },
    {
        id: 2,
        name: "USB-C Fast Charging Cable",
        category: "electronics",
        price: 12.99,
        originalPrice: 19.99,
        rating: 4.8,
        reviews: 5432,
        emoji: "🔌"
    },
    {
        id: 3,
        name: "The Art of Computer Programming",
        category: "books",
        price: 45.99,
        originalPrice: 59.99,
        rating: 5,
        reviews: 1203,
        emoji: "📚"
    },
    {
        id: 4,
        name: "Clean Code: A Handbook",
        category: "books",
        price: 32.99,
        originalPrice: 49.99,
        rating: 4.7,
        reviews: 3421,
        emoji: "📖"
    },
    {
        id: 5,
        name: "Premium Wireless Mouse",
        category: "electronics",
        price: 34.99,
        originalPrice: 59.99,
        rating: 4.4,
        reviews: 2156,
        emoji: "🖱️"
    },
    {
        id: 6,
        name: "Mechanical Keyboard RGB",
        category: "electronics",
        price: 89.99,
        originalPrice: 149.99,
        rating: 4.6,
        reviews: 4234,
        emoji: "⌨️"
    },
    {
        id: 7,
        name: "Cotton T-Shirt Set",
        category: "clothing",
        price: 24.99,
        originalPrice: 39.99,
        rating: 4.3,
        reviews: 876,
        emoji: "👕"
    },
    {
        id: 8,
        name: "Denim Jeans Premium",
        category: "clothing",
        price: 59.99,
        originalPrice: 89.99,
        rating: 4.5,
        reviews: 2341,
        emoji: "👖"
    },
    {
        id: 9,
        name: "Stainless Steel Cookware Set",
        category: "home",
        price: 69.99,
        originalPrice: 119.99,
        rating: 4.7,
        reviews: 3456,
        emoji: "🍳"
    },
    {
        id: 10,
        name: "Non-Stick Frying Pan",
        category: "home",
        price: 39.99,
        originalPrice: 64.99,
        rating: 4.4,
        reviews: 2134,
        emoji: "🥘"
    },
    {
        id: 11,
        name: "Yoga Mat Premium",
        category: "sports",
        price: 34.99,
        originalPrice: 54.99,
        rating: 4.6,
        reviews: 1876,
        emoji: "🧘"
    },
    {
        id: 12,
        name: "Adjustable Dumbbells Set",
        category: "sports",
        price: 199.99,
        originalPrice: 299.99,
        rating: 4.8,
        reviews: 3241,
        emoji: "🏋️"
    },
    {
        id: 13,
        name: "4K Webcam Pro",
        category: "electronics",
        price: 159.99,
        originalPrice: 249.99,
        rating: 4.5,
        reviews: 1543,
        emoji: "📷"
    },
    {
        id: 14,
        name: "Portable Phone Stand",
        category: "electronics",
        price: 14.99,
        originalPrice: 24.99,
        rating: 4.7,
        reviews: 4123,
        emoji: "📱"
    },
    {
        id: 15,
        name: "Cozy Hoodie Sweatshirt",
        category: "clothing",
        price: 49.99,
        originalPrice: 79.99,
        rating: 4.4,
        reviews: 2876,
        emoji: "🧥"
    },
    {
        id: 16,
        name: "Smart Watch Fitness",
        category: "electronics",
        price: 199.99,
        originalPrice: 329.99,
        rating: 4.6,
        reviews: 5432,
        emoji: "⌚"
    }
];

// Shopping Cart
let cart = [];
let currentFilter = 'all';
let currentSort = 'default';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    renderProducts(products);
    updateCartCount();
});

// Render Products
function renderProducts(productsToRender) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    if (productsToRender.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px;">No products found</p>';
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
        
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-content">
                <div class="product-name">${product.name}</div>
                <div class="product-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span class="rating-count">${product.rating} (${product.reviews})</span>
                </div>
                <div class="product-original-price">$${product.originalPrice.toFixed(2)}</div>
                <div class="product-price">
                    $${product.price.toFixed(2)}
                    <small style="color: var(--primary-color); margin-left: 8px;">-${discount}%</small>
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
}

function applyTheme(theme) {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    
    if (theme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.className = 'fas fa-sun';
        }
    } else {
        body.classList.remove('dark-theme');
        if (themeToggle) {
            themeToggle.className = 'fas fa-moon';
        }
    }
}

// Filter Products
function filterProducts(category) {
    event.preventDefault();
    currentFilter = category;
    applyFiltersAndSort();
}

// Sort Products
function sortProducts(sortType) {
    event.preventDefault();
    currentSort = sortType;
    applyFiltersAndSort();
}

// Apply Filters and Sort
function applyFiltersAndSort() {
    let filtered = products;

    // Apply filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(p => p.category === currentFilter);
    }

    // Apply sort
    if (currentSort === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderProducts(filtered);
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();
    showAddedNotification();
}

// Update Cart Display
function updateCart() {
    updateCartCount();
    renderCartItems();
    updateCartTotal();
}

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// Render Cart Items
function renderCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span style="width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    <span class="remove-item" onclick="removeFromCart(${item.id})">Remove</span>
                </div>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCart();
        }
    }
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update Cart Total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotal').textContent = '$' + total.toFixed(2);
}

// Toggle Cart Sidebar
function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// Search Functionality
document.getElementById('searchInput')?.addEventListener('keyup', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    renderProducts(filtered);
});

// Show Added Notification
function showAddedNotification() {
    // Visual feedback could be added here
    console.log('Product added to cart');
}