# Aamardukan E-Commerce Website

A responsive, user-friendly e-commerce website frontend for a small online shop. This project includes all the essential pages and functionality needed for a modern online shopping experience.

## Features

### 1. Product Listing Page
- Grid layout displaying products with images, names, prices, and ratings
- Filter products by category and price range
- Sort products by price, name, or popularity
- Responsive design for all screen sizes
- "Add to Cart" functionality

### 2. Product Details Page
- Detailed product information with multiple images
- Color and quantity selection
- Customer reviews and ratings section
- Related products

### 3. Shopping Cart Page
- View all items in cart with images and details
- Update item quantities or remove items
- Dynamic price calculation
- Coupon code application
- Proceed to checkout option

### 4. Checkout Page (UI Only)
- Multi-step checkout process
- Shipping information form
- Payment method selection
- Order summary with calculated totals
- Responsive layout

## Technologies Used

- **HTML5**: Semantic markup for accessibility
- **CSS3**: Flexbox, Grid, CSS variables, responsive design
- **JavaScript**: ES6+ for interactivity and cart management
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## Project Structure

ecommerce-website/
├── index.html # Product listing page
├── product-details.html # Product details page
├── cart.html # Shopping cart page
├── checkout.html # Checkout page
├── css/
│ ├── style.css # Main stylesheet
│ └── responsive.css # Responsive styles
├── js/
│ ├── script.js # Main JavaScript functionality
│ ├── cart.js # Cart management
│ └── product-data.js # Product data
└── README.md # This file


## Setup and Usage

1. **Clone or download** the project files to your local machine.

2. **Open the project** in a code editor to make any modifications.

3. **Run the website** by opening `index.html` in a web browser.

4. **No build process or dependencies** required - it's a pure frontend project.

## Key Functionality

### Cart System
- Uses localStorage to persist cart data between page visits
- Real-time updates to cart count in header
- Dynamic price calculations
- Quantity adjustments

### Responsive Design
- Mobile-first approach
- Adaptive layouts for phones, tablets, and desktops
- Touch-friendly interface on mobile devices

### User Experience
- Clear navigation and intuitive interface
- Visual feedback for user actions
- Accessible form controls and semantic HTML

## Customization

### Colors
Edit the CSS variables in `css/style.css` to change the color scheme:
```css
:root {
    --primary-color: #3a86ff;
    --primary-dark: #2667cc;
    --secondary-color: #8338ec;
    /* ... */
}

Products
Modify the products array in js/product-data.js to add or update products:
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 99.99,
        category: "electronics",
        image: "image-url.jpg",
        // ...
    },
    // ...
];

Images
Replace the Unsplash image URLs with your own product images. All images are loaded from external sources in this demo.

Browser Compatibility
Chrome 60+

Firefox 55+

Safari 11+

Edge 79+

Future Enhancements
Backend integration for actual product database

User authentication and account management

Payment gateway integration

Product search functionality

Admin dashboard for inventory management

License
This project is for educational purposes. Feel free to use and modify for personal or commercial projects.

Credits
Product images from Unsplash

Icons from Font Awesome

Fonts from Google Fonts

Design inspiration from modern e-commerce platforms


## How to Run the Project

1. Create a folder for the project (e.g., `ecommerce-website`)
2. Create the file structure as shown above
3. Copy the code for each file into its respective location
4. Open `index.html` in your web browser

The website is now fully functional with:
- Responsive design that works on mobile, tablet, and desktop
- Interactive product filtering and sorting
- Working shopping cart with localStorage persistence
- Product details page with image gallery
- Checkout page with form validation
- All required JavaScript functionality

All images are loaded from Unsplash, so an internet connection is required to view product images. The cart functionality uses localStorage, so cart data will persist between browser sessions.

This implementation provides a complete, production-ready frontend for an e-commerce website with clean, well-commented code that follows modern web development practices.
