
// Cart Functionality for E-Commerce Website

// Get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Add product to cart
function addToCart(product) {
    const cart = getCart();
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += product.quantity || 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price, // Already in INR
            image: product.image,
            quantity: product.quantity || 1,
            color: product.color || null
        });
    }
    
    saveCart(cart);
    updateCartCount();
}

// Remove item from cart
function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    updateCartCount();
}

// Update item quantity in cart
function updateCartItemQuantity(productId, newQuantity) {
    if (newQuantity < 1) return;
    
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
        updateCartCount();
    }
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem('cart');
    updateCartCount();
}

// Calculate cart subtotal in INR
function calculateCartSubtotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Calculate order total with shipping and tax in INR
function calculateOrderTotal() {
    const subtotal = calculateCartSubtotal();
    const shipping = subtotal > 0 ? 99 : 0; // ₹99 shipping for non-zero orders
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + shipping + tax;
    
    return {
        subtotal: subtotal.toFixed(2),
        shipping: shipping.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2)
    };
}

// Format price to Indian Rupees
function formatPrice(price) {
    return `₹${parseFloat(price).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

// Load cart items on cart page
function loadCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cart = getCart();
    
    if (!cartItemsContainer) return;
    
    // Clear container
    cartItemsContainer.innerHTML = '';
    
    // Check if cart is empty
    if (cart.length === 0) {
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        return;
    }
    
    // Hide empty cart message
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    // Display cart items
    cart.forEach(item => {
        const cartItem = createCartItemElement(item);
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update cart items count
    const cartItemsCount = document.getElementById('cart-items-count');
    if (cartItemsCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartItemsCount.textContent = totalItems;
    }
}

// Create cart item element with INR prices
function createCartItemElement(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    cartItem.dataset.id = item.id;
    
    // Calculate item total
    const itemTotal = (item.price * item.quantity);
    
    cartItem.innerHTML = `
        <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
            <h3 class="cart-item-title">${item.name}</h3>
            ${item.color ? `<p class="cart-item-color">Color: ${item.color}</p>` : ''}
            <p class="cart-item-price">${formatPrice(item.price)} each</p>
        </div>
        <div class="cart-item-actions">
            <div class="cart-item-quantity">
                <button class="quantity-control decrease-quantity" data-id="${item.id}">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-control increase-quantity" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-total">
                <span>${formatPrice(itemTotal)}</span>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;

    // Add event listeners
    const decreaseBtn = cartItem.querySelector('.decrease-quantity');
    const increaseBtn = cartItem.querySelector('.increase-quantity');
    const removeBtn = cartItem.querySelector('.remove-item');
    
    decreaseBtn.addEventListener('click', function() {
        const currentQuantity = parseInt(cartItem.querySelector('.quantity-value').textContent);
        if (currentQuantity > 1) {
            updateCartItemQuantity(item.id, currentQuantity - 1);
            loadCartItems();
            updateCartSummary();
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentQuantity = parseInt(cartItem.querySelector('.quantity-value').textContent);
        updateCartItemQuantity(item.id, currentQuantity + 1);
        loadCartItems();
        updateCartSummary();
    });
    
    removeBtn.addEventListener('click', function() {
        removeFromCart(item.id);
        loadCartItems();
        updateCartSummary();
    });
    
    return cartItem;
}

// Update cart summary on cart page with INR
function updateCartSummary() {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');
    
    if (!subtotalElement || !totalElement) return;
    
    const orderTotal = calculateOrderTotal();
    
    subtotalElement.textContent = formatPrice(orderTotal.subtotal);
    if (shippingElement) shippingElement.textContent = formatPrice(orderTotal.shipping);
    if (taxElement) taxElement.textContent = formatPrice(orderTotal.tax);
    totalElement.textContent = formatPrice(orderTotal.total);
    
    // Update checkout button text with total
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.innerHTML = `Proceed to Checkout - ${formatPrice(orderTotal.total)}`;
    }
}

// Update cart count in header
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count');
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on cart page
    if (document.querySelector('.cart-container')) {
        // Load cart items
        loadCartItems();
        
        // Update cart summary
        updateCartSummary();
        
        // Clear cart button
        const clearCartBtn = document.getElementById('clear-cart');
        if (clearCartBtn) {
            clearCartBtn.addEventListener('click', function() {
                if (confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                    loadCartItems();
                    updateCartSummary();
                }
            });
        }
        
        // Apply coupon button
        const applyCouponBtn = document.getElementById('apply-coupon');
        if (applyCouponBtn) {
            applyCouponBtn.addEventListener('click', function() {
                const couponCode = document.getElementById('coupon-code').value;
                if (couponCode === 'SAVE10') {
                    alert('Coupon applied! You got 10% off.');
                    // In a real application, this would update the cart total
                } else if (couponCode) {
                    alert('Invalid coupon code. Please try again.');
                } else {
                    alert('Please enter a coupon code.');
                }
            });
        }
        
        // Checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function(e) {
                const cart = getCart();
                if (cart.length === 0) {
                    e.preventDefault();
                    alert('Your cart is empty. Please add items before checkout.');
                }
            });
        }
    }
});