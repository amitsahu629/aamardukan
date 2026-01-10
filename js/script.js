// Main JavaScript for E-Commerce Website

// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.querySelector('.main-nav');
const productsGrid = document.getElementById('products-grid');
const categoryFilter = document.getElementById('category-filter');
const priceRange = document.getElementById('price-range');
const priceRangeValue = document.getElementById('price-range-value');
const sortOptions = document.getElementById('sort-options');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Load products on the product listing page
    if (productsGrid) {
        displayProducts(getAllProducts());
    }
    
    // Initialize event listeners
    initEventListeners();
    
    // Update cart count on all pages
    updateCartCount();
});

// Initialize all event listeners
function initEventListeners() {
    // Mobile menu toggle
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Category filter
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterProducts);
    }
    
    // Price range filter
    if (priceRange) {
        priceRange.addEventListener('input', updatePriceRangeValue);
        priceRange.addEventListener('change', filterProducts);
    }
    
    // Sort options
    if (sortOptions) {
        sortOptions.addEventListener('change', sortProducts);
    }
}

// Toggle mobile menu
function toggleMobileMenu() {
    mainNav.classList.toggle('active');
    
    // Change icon based on menu state
    const icon = mobileMenuBtn.querySelector('i');
    if (mainNav.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
}

// Update price range value display
function updatePriceRangeValue() {
    if (priceRangeValue) {
        const value = parseInt(priceRange.value);
        priceRangeValue.textContent = `₹0 - ₹${value.toLocaleString('en-IN')}`;
    }
}

// Display products in the grid
function displayProducts(productsArray) {
    if (!productsGrid) return;
    
    // Clear the grid
    productsGrid.innerHTML = '';
    
    // Check if there are products
    if (productsArray.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters to find what you're looking for.</p>
            </div>
        `;
        return;
    }
    
    // Create product cards
    productsArray.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    card.dataset.category = product.category;
    card.dataset.price = product.price;
    
    // Calculate discount percentage
    const discount = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    // Generate star rating HTML
    const starsHTML = generateStarRating(product.rating);
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${starsHTML}
                </div>
                <span class="rating-value">${product.rating} (${product.reviews})</span>
            </div>
            <div class="product-price">
                <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
                ${product.originalPrice ? `
                    <span class="original-price">₹${product.originalPrice.toLocaleString('en-IN')}</span>
                    <span class="discount">${discount}% off</span>
                ` : ''}
            </div>
            <div class="product-actions">
                <button class="btn btn-primary btn-add-to-cart" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn-icon btn-view-details" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners to buttons
    const addToCartBtn = card.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addProductToCart(product);
    });
    
    const viewDetailsBtn = card.querySelector('.btn-view-details');
    viewDetailsBtn.addEventListener('click', function() {
        // In a real application, this would navigate to the product details page
        // For this demo, we'll simulate navigation
        window.location.href = `product-details.html?id=${product.id}`;
    });
    
    return card;
}

// Generate star rating HTML
function generateStarRating(rating) {
    let starsHTML = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHTML += '<i class="far fa-star"></i>';
        }
    }
    
    return starsHTML;
}

// Filter products based on selected filters
function filterProducts() {
    const category = categoryFilter ? categoryFilter.value : 'all';
    const maxPrice = priceRange ? parseInt(priceRange.value) : 1000;
    
    let filteredProducts = getAllProducts();
    
    // Filter by category
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }
    
    // Filter by price
    filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    
    // Apply sorting
    filteredProducts = sortProductsArray(filteredProducts, sortOptions ? sortOptions.value : 'default');
    
    // Display filtered products
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    filterProducts(); // Re-filter with new sort option
}

// Sort products array based on selected option
function sortProductsArray(productsArray, sortOption) {
    const sortedArray = [...productsArray];
    
    switch(sortOption) {
        case 'price-low':
            return sortedArray.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sortedArray.sort((a, b) => b.price - a.price);
        case 'name':
            return sortedArray.sort((a, b) => a.name.localeCompare(b.name));
        case 'popular':
            return sortedArray.sort((a, b) => b.rating - a.rating);
        default:
            return sortedArray;
    }
}

// Add a product to the cart
function addProductToCart(product) {
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        // Update quantity if product already in cart
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart (price already in INR from product-data.js)
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price, // Already in INR
            image: product.image,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification('Product added to cart!', 'success');
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Show notification
function showNotification(message, type = 'info') {
    // Check if notification container exists
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
        // Create notification container
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 10px;
        `;
        document.body.appendChild(notificationContainer);
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        background-color: ${type === 'success' ? '#06d6a0' : '#3a86ff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">×</button>
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Add to container
    notificationContainer.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
    
    // Add CSS for animations
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}