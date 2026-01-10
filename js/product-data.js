// Product Data for E-Commerce Website (Prices in INR)

const products = [
    {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 7499,
        originalPrice: 10999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 128,
        description: "Experience superior sound quality with these premium wireless headphones. Featuring noise cancellation technology, 30-hour battery life, and ultra-comfortable memory foam ear cushions.",
        inStock: true
    },
    {
        id: 2,
        name: "Smart Watch Series 5",
        price: 16999,
        originalPrice: 21999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.3,
        reviews: 89,
        description: "Stay connected with this advanced smartwatch featuring health monitoring, GPS, and long battery life.",
        inStock: true
    },
    {
        id: 3,
        name: "Organic Cotton T-Shirt",
        price: 899,
        originalPrice: 1499,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.7,
        reviews: 203,
        description: "Comfortable and sustainable organic cotton t-shirt available in multiple colors.",
        inStock: true
    },
    {
        id: 4,
        name: "Stainless Steel Water Bottle",
        price: 1299,
        originalPrice: 1999,
        category: "home",
        image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.4,
        reviews: 156,
        description: "Keep your drinks hot or cold for hours with this double-walled stainless steel bottle.",
        inStock: true
    },
    {
        id: 5,
        name: "Fitness Tracker Band",
        price: 3499,
        originalPrice: 4999,
        category: "sports",
        image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.2,
        reviews: 78,
        description: "Track your workouts, heart rate, and sleep patterns with this comfortable fitness band.",
        inStock: true
    },
    {
        id: 6,
        name: "Bluetooth Portable Speaker",
        price: 4499,
        originalPrice: 5999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviews: 142,
        description: "Take your music anywhere with this waterproof Bluetooth speaker with 12-hour battery life.",
        inStock: true
    },
    {
        id: 7,
        name: "Classic Novel Collection",
        price: 2499,
        originalPrice: 3499,
        category: "books",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.8,
        reviews: 56,
        description: "A collection of 5 classic novels in a beautifully designed box set.",
        inStock: true
    },
    {
        id: 8,
        name: "Ceramic Coffee Mug Set",
        price: 1899,
        originalPrice: 2599,
        category: "home",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.5,
        reviews: 91,
        description: "Set of 4 handmade ceramic mugs with unique designs. Microwave and dishwasher safe.",
        inStock: true
    },
    {
        id: 9,
        name: "Men's Casual Shoes",
        price: 2199,
        originalPrice: 2999,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.4,
        reviews: 167,
        description: "Comfortable and stylish casual shoes for men, perfect for everyday wear.",
        inStock: true
    },
    {
        id: 10,
        name: "Women's Handbag",
        price: 3299,
        originalPrice: 4499,
        category: "clothing",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        rating: 4.6,
        reviews: 134,
        description: "Elegant and spacious handbag for women with multiple compartments.",
        inStock: true
    }
];

// Function to get all products
function getAllProducts() {
    return products;
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Function to get products by category
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}