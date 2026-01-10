// Deals Page JavaScript

// Deals data
const dealsData = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 7499,
        originalPrice: 10999,
        discount: 32,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "flash",
        rating: 4.5,
        reviews: 128,
        featured: true
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 16999,
        originalPrice: 21999,
        discount: 23,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "clearance",
        rating: 4.3,
        reviews: 89,
        featured: true
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: 899,
        originalPrice: 1499,
        discount: 40,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "bundle",
        rating: 4.7,
        reviews: 203,
        featured: true
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        price: 1299,
        originalPrice: 1999,
        discount: 35,
        category: "home",
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "festive",
        rating: 4.4,
        reviews: 156,
        featured: true
    },
    {
        id: 5,
        name: "Fitness Tracker Band",
        price: 3499,
        originalPrice: 4999,
        discount: 30,
        category: "sports",
        image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "flash",
        rating: 4.2,
        reviews: 78,
        featured: false
    },
    {
        id: 6,
        name: "Bluetooth Portable Speaker",
        price: 4499,
        originalPrice: 5999,
        discount: 25,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "clearance",
        rating: 4.6,
        reviews: 142,
        featured: false
    },
    {
        id: 7,
        name: "Men's Casual Shoes",
        price: 2199,
        originalPrice: 2999,
        discount: 27,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "bundle",
        rating: 4.4,
        reviews: 167,
        featured: false
    },
    {
        id: 8,
        name: "Women's Handbag",
        price: 3299,
        originalPrice: 4499,
        discount: 27,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        dealType: "festive",
        rating: 4.6,
        reviews: 134,
        featured: false
    }
];

// Timer for flash sale
let flashSaleTimer;

// Initialize the deals page
document.addEventListener('DOMContentLoaded', function() {
    // Start flash sale timer
    startFlashSaleTimer();
    
    // Load featured deals
    loadFeaturedDeals();
    
    // Initialize tab functionality
    initDealTabs();
    
    // Initialize day tabs
    initDayTabs();
    
    // Add event listeners to deal buttons
    addDealButtonListeners();
});

// Start flash sale countdown timer
function startFlashSaleTimer() {
    // Set end time (12 hours from now)
    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 12);
    
    function updateTimer() {
        const now = new Date();
        const timeLeft = endTime - now;
        
        if (timeLeft <= 0) {
            clearInterval(flashSaleTimer);
            document.getElementById('flash-sale-timer').innerHTML = '<div class="timer-ended">Sale Ended!</div>';
            document.getElementById('small-timer').innerHTML = 'Sale Ended!';
            return;
        }
        
        // Calculate hours, minutes, seconds
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        // Format with leading zeros
        const formatTime = (time) => time < 10 ? `0${time}` : time;
        
        // Update main timer
        document.getElementById('hours').textContent = formatTime(hours);
        document.getElementById('minutes').textContent = formatTime(minutes);
        document.getElementById('seconds').textContent = formatTime(seconds);
        
        // Update small timer
        document.getElementById('small-hours').textContent = formatTime(hours);
        document.getElementById('small-minutes').textContent = formatTime(minutes);
        document.getElementById('small-seconds').textContent = formatTime(seconds);
    }
    
    // Update timer immediately
    updateTimer();
    
    // Update timer every second
    flashSaleTimer = setInterval(updateTimer, 1000);
}

// Load featured deals
function loadFeaturedDeals() {
    const featuredDealsContainer = document.getElementById('featured-deals');
    if (!featuredDealsContainer) return;
    
    // Clear container
    featuredDealsContainer.innerHTML = '';
    
    // Get featured deals
    const featuredDeals = dealsData.filter(deal => deal.featured);
    
    // Create deal cards
    featuredDeals.forEach(deal => {
        const dealCard = createDealCard(deal);
        featuredDealsContainer.appendChild(dealCard);
    });
}

// Create deal card
function createDealCard(deal) {
    const card = document.createElement('div');
    card.className = 'deal-card';
    card.dataset.id = deal.id;
    card.dataset.category = deal.category;
    card.dataset.dealType = deal.dealType;
    
    // Generate star rating HTML
    const starsHTML = generateStarRating(deal.rating);
    
    card.innerHTML = `
        <div class="deal-badge">${deal.discount}% OFF</div>
        <div class="deal-image">
            <img src="${deal.image}" alt="${deal.name}">
        </div>
        <div class="deal-info">
            <h3 class="deal-title">${deal.name}</h3>
            <div class="deal-rating">
                <div class="stars">
                    ${starsHTML}
                </div>
                <span class="rating-value">${deal.rating} (${deal.reviews})</span>
            </div>
            <div class="deal-price">
                <span class="current-price">₹${deal.price.toLocaleString('en-IN')}</span>
                <span class="original-price">₹${deal.originalPrice.toLocaleString('en-IN')}</span>
            </div>
            <div class="deal-type">
                <span class="type-badge ${deal.dealType}">${getDealTypeLabel(deal.dealType)}</span>
            </div>
            <div class="deal-actions">
                <button class="btn btn-primary btn-add-to-cart" data-id="${deal.id}">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
                <button class="btn btn-secondary btn-view-details" data-id="${deal.id}">
                    View Details
                </button>
            </div>
        </div>
    `;
    
    // Add event listeners
    const addToCartBtn = card.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        addDealToCart(deal);
    });
    
    const viewDetailsBtn = card.querySelector('.btn-view-details');
    viewDetailsBtn.addEventListener('click', function() {
        // Navigate to product details page
        window.location.href = `product-details.html?id=${deal.id}`;
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

// Get deal type label
function getDealTypeLabel(dealType) {
    const labels = {
        'flash': 'Flash Sale',
        'clearance': 'Clearance',
        'bundle': 'Bundle Deal',
        'festive': 'Festive Offer',
        'bank': 'Bank Offer'
    };
    
    return labels[dealType] || dealType;
}

// Add deal to cart
function addDealToCart(deal) {
    // Get current cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already exists in cart
    const existingProductIndex = cart.findIndex(item => item.id === deal.id);
    
    if (existingProductIndex !== -1) {
        // Update quantity if product already in cart
        cart[existingProductIndex].quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            id: deal.id,
            name: deal.name,
            price: deal.price,
            image: deal.image,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    showNotification('Deal added to cart!', 'success');
}

// Update cart count
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
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#06d6a0' : '#3a86ff'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer; margin-left: 10px;">×</button>
    `;
    
    // Add close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    });
    
    // Add to body
    document.body.appendChild(notification);
    
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
    
    // Add CSS for animations if not already added
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

// Initialize deal tabs
function initDealTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const dealCards = document.querySelectorAll('.deal-card');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // Filter deals
            if (category === 'all') {
                // Show all deals
                dealCards.forEach(card => {
                    card.style.display = 'block';
                });
            } else {
                // Show only deals of selected category
                dealCards.forEach(card => {
                    if (card.dataset.dealType === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            }
        });
    });
}

// Initialize day tabs
function initDayTabs() {
    const dayTabs = document.querySelectorAll('.day-tab');
    
    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all day tabs
            dayTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const day = this.dataset.day;
            
            // In a real application, this would load deals for the selected day
            // For this demo, we'll just show a message
            console.log(`Loading deals for ${day}`);
        });
    });
}

// Add event listeners to deal buttons
function addDealButtonListeners() {
    // Buy Now buttons in flash sale
    const buyNowButtons = document.querySelectorAll('.flash-product-card .btn-primary');
    buyNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.flash-product-card');
            const productName = productCard.querySelector('h3').textContent;
            showNotification(`Added ${productName} to cart!`, 'success');
        });
    });
    
    // View Details buttons in bank offers
    const viewDetailsButtons = document.querySelectorAll('.offer-card .btn-secondary');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const offerCard = this.closest('.offer-card');
            const offerTitle = offerCard.querySelector('h3').textContent;
            alert(`Details for: ${offerTitle}\n\nThis would show more information about the offer in a real application.`);
        });
    });
    
    // Grab Deal button
    const grabDealButton = document.querySelector('.deal-of-the-day .btn-primary');
    if (grabDealButton) {
        grabDealButton.addEventListener('click', function() {
            showNotification('Deal of the Day added to cart!', 'success');
        });
    }
}