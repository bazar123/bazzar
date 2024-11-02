document.addEventListener("DOMContentLoaded", () => {
    // Initialize favorites and cart lists from localStorage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Update favorites and cart counts
    const updateCounts = () => {
        document.getElementById("favorites-count").innerText = favorites.length;
        document.getElementById("cart-count").innerText = cart.length;
    };

    // Save favorites and cart to localStorage
    const saveData = () => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
        localStorage.setItem("cart", JSON.stringify(cart));
    };

    // Add item to favorites
    const addToFavorites = (product) => {
        if (!favorites.find(item => item.id === product.id)) {
            favorites.push(product);
            saveData();
            updateCounts();
            renderFavorites();
        }
    };

    // Remove item from favorites
    const removeFromFavorites = (productId) => {
        favorites = favorites.filter(item => item.id !== productId);
        saveData();
        updateCounts();
        renderFavorites();
    };

    // Add item to cart
    const addToCart = (product) => {
        cart.push(product);
        saveData();
        updateCounts();
        renderCart();
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        cart = cart.filter(item => item.id !== productId);
        saveData();
        updateCounts();
        renderCart();
    };

    // Render favorites list
    const renderFavorites = () => {
        const favoritesList = document.getElementById("favorites-items");
        favoritesList.innerHTML = "";

        favorites.forEach((item) => {
            const li = document.createElement("li");
            li.innerText = `${item.name} - $${item.price}`;
            const removeButton = document.createElement("button");
            removeButton.innerText = "Remove";
            removeButton.classList.add("remove-from-favorites");
            removeButton.addEventListener("click", () => removeFromFavorites(item.id));
            li.appendChild(removeButton);
            favoritesList.appendChild(li);
        });
    };

    // Render cart list
    const renderCart = () => {
        const cartList = document.getElementById("cart-items");
        const totalElement = document.getElementById("total");
        cartList.innerHTML = "";

        let total = 0;
        cart.forEach((item) => {
            total += parseFloat(item.price);
            const li = document.createElement("li");
            li.innerText = `${item.name} - $${item.price}`;
            const removeButton = document.createElement("button");
            removeButton.innerText = "Remove";
            removeButton.classList.add("remove-from-cart");
            removeButton.addEventListener("click", () => removeFromCart(item.id));
            li.appendChild(removeButton);
            cartList.appendChild(li);
        });

        totalElement.innerText = `Total: $${total.toFixed(2)}`;
    };

    // Attach click events to "Add to Favorites" and "Add to Cart" buttons
    document.querySelectorAll(".product").forEach((productElement) => {
        const productData = {
            id: productElement.dataset.id,
            name: productElement.dataset.name,
            price: productElement.dataset.price,
        };

        productElement.querySelector(".add-to-favorites").addEventListener("click", () => addToFavorites(productData));
        productElement.querySelector(".add-to-cart").addEventListener("click", () => addToCart(productData));
    });

    // Initial render of favorites and cart
    renderFavorites();
    renderCart();
    updateCounts();
});
document.addEventListener("DOMContentLoaded", () => {
    // Profile details (in a real application, these would come from a backend API)
    const profile = {
        name: "John Doe",
        email: "johndoe@example.com"
    };

    // Display profile details
    document.getElementById("profile-name").innerText = profile.name;
    document.getElementById("profile-email").innerText = profile.email;

    // Logout action
    document.getElementById("logout-button").addEventListener("click", () => {
        alert("Logged out successfully");
        // In a real application, clear session data and redirect to login page
    });
});
document.addEventListener("DOMContentLoaded", () => {
    const profile = {
        name: "",
        email: "",
        role: "buyer" // default to buyer
    };

    // Open registration modal
    document.getElementById("register-button").addEventListener("click", () => {
        // Get user details
        profile.name = document.getElementById("name").value;
        profile.email = document.getElementById("email").value;
        profile.role = document.getElementById("account-type").value;

        // Display profile details
        document.getElementById("profile-name").innerText = profile.name;
        document.getElementById("profile-email").innerText = profile.email;
        document.getElementById("account-role").innerText = profile.role === "buyer" ? "Buyer" : "Seller";

        // Adjust UI based on role
        updateUIForRole(profile.role);

        // Close registration modal
        document.getElementById("registration-modal").style.display = "none";
    });

    // Function to adjust UI based on user role
    const updateUIForRole = (role) => {
        if (role === "seller") {
            // Show seller-specific features (e.g., add product button)
            document.getElementById("add-product-button").style.display = "block";
        } else {
            // Show buyer-specific features
            document.getElementById("add-product-button").style.display = "none";
        }
    };

    // Logout action
    document.getElementById("logout-button").addEventListener("click", () => {
        alert("Logged out successfully");
        // Clear session and reset profile display
        document.getElementById("profile-name").innerText = "";
        document.getElementById("profile-email").innerText = "";
        document.getElementById("account-role").innerText = "";
    });
});
// Show loading spinner when fetching data
function showSpinner() {
    document.getElementById('loading-spinner').classList.add('show-spinner');
}

// Hide loading spinner after fetching data
function hideSpinner() {
    document.getElementById('loading-spinner').classList.remove('show-spinner');
}

// Example: Show spinner before making an API call
function fetchData() {
    showSpinner();
    // Simulating an API call with setTimeout
    setTimeout(() => {
        // Hide spinner after data is loaded
        hideSpinner();
    }, 2000); // Simulate a delay of 2 seconds
}

// Call fetchData when the page loads or when needed
fetchData();
function toggleChat() {
    const chatBody = document.getElementById("chatBody");
    const chatToggle = document.getElementById("chatToggle");
    if (chatBody.style.display === "none" || chatBody.style.display === "") {
        chatBody.style.display = "block";
        chatToggle.textContent = "-";
    } else {
        chatBody.style.display = "none";
        chatToggle.textContent = "+";
    }
}

function sendMessage() {
    const chatInput = document.getElementById("chatInput");
    const chatMessages = document.getElementById("chatMessages");
    const userMessage = chatInput.value.trim();

    if (userMessage === "") return;

    // Add user message
    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "chat-message user";
    userMessageDiv.textContent = userMessage;
    chatMessages.appendChild(userMessageDiv);

    // Scroll to the bottom of chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Clear input
    chatInput.value = "";

    // Add bot response (simple bot response simulation)
    setTimeout(() => {
        const botMessageDiv = document.createElement("div");
        botMessageDiv.className = "chat-message bot";
        botMessageDiv.textContent = "Thanks for your message! How can I help you?";
        chatMessages.appendChild(botMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}
// Check if user is a seller
let userType = "seller"; // This would be dynamically set based on login data

// Only display the seller dashboard if user is a seller
window.onload = function () {
    const sellerDashboard = document.getElementById("sellerDashboard");
    if (userType !== "seller") {
        sellerDashboard.style.display = "none";
    }
};

// Show the add product form
function showAddProductForm() {
    const addProductForm = document.getElementById("addProductForm");
    addProductForm.style.display = addProductForm.style.display === "none" ? "block" : "none";
}

// Function to handle adding a product
function addProduct() {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDescription = document.getElementById("productDescription").value;

    if (!productName || !productPrice) {
        alert("Please fill in all required fields.");
        return;
    }

    // Example: Add the product to a list (or send it to a server in a real app)
    console.log("Product added:", {
        name: productName,
        price: productPrice,
        description: productDescription
    });

    alert("Product added successfully!");
    
    // Clear form
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";
    showAddProductForm(); // Close the form after submission
}
// Sample data for testing
let totalSales = 500;
let totalOrders = 30;
let totalRevenue = 2500;
let averageRating = 4.5;
let topProduct = "Product A";
let totalReviews = 120;
let inventory = [
    { name: "Product A", price: 50 },
    { name: "Product B", price: 30 },
    { name: "Product C", price: 20 }
];
let recentOrders = [
    { orderId: 1, productName: "Product A", status: "Shipped" },
    { orderId: 2, productName: "Product B", status: "Delivered" }
];

// Display summary data
document.getElementById("totalSales").textContent = `$${totalSales}`;
document.getElementById("totalOrders").textContent = totalOrders;
document.getElementById("totalRevenue").textContent = `$${totalRevenue}`;
document.getElementById("averageRating").textContent = averageRating;
document.getElementById("topProduct").textContent = topProduct;
document.getElementById("totalReviews").textContent = totalReviews;

// Display inventory list
const productList = document.getElementById("productList");
inventory.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.textContent = `${product.name} - $${product.price}`;
    productList.appendChild(productDiv);
});

// Display recent orders
const orderList = document.getElementById("orderList");
recentOrders.forEach(order => {
    const orderDiv = document.createElement("div");
    orderDiv.textContent = `Order #${order.orderId}: ${order.productName} - ${order.status}`;
    orderList.appendChild(orderDiv);
});

// Show add product form
function showAddProductForm() {
    const addProductForm = document.getElementById("addProductForm");
    addProductForm.style.display = addProductForm.style.display === "none" ? "block" : "none";
}

// Function to handle adding a product
function addProduct() {
    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDescription = document.getElementById("productDescription").value;

    if (!productName || !productPrice) {
        alert("Please fill in all required fields.");
        return;
    }

    // Add product to inventory list
    const productDiv = document.createElement("div");
    productDiv.textContent = `${productName} - $${productPrice}`;
    productList.appendChild(productDiv);

    alert("Product added successfully!");
    
    // Clear form
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productDescription").value = "";
    showAddProductForm();
}

// Profile and Business Info editing (placeholder functions)
function editProfile() {
    alert("Edit profile functionality coming soon.");
}

function editBusinessInfo() {
    alert("Edit business info functionality coming soon.");
}
const searchInput = document.getElementById('searchInput');
const suggestions = ['Product A', 'Product B', 'Product C'];

searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredSuggestions = suggestions.filter(item => item.toLowerCase().includes(query));
    console.log(filteredSuggestions); // Show suggestions in the UI as a dropdown
});
function openQuickView(productId) {
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'block';
    // Load product details based on productId
}

function closeQuickView() {
    const modal = document.getElementById('quickViewModal');
    modal.style.display = 'none';
}
function addToWishlist(productId) {
    // Store the wishlist in local storage or send it to the server
    alert('Product added to wishlist!');
}
// Example functions to toggle FAQ answers and show/hide modals
function toggleFaq(faqId) {
    const answer = document.getElementById(`faq${faqId}`);
    answer.style.display = answer.style.display === "none" ? "block" : "none";
}

function subscribeNewsletter() {
    alert("Thank you for subscribing!");
}

// Function to load featured products, top sellers, etc.
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featuredProducts .product-grid');
    // Dynamically load featured products here
}
// JavaScript to add fade-in effect when loading products
document.querySelectorAll('.product-item').forEach(item => {
    item.classList.add('fade-in');
});
window.onscroll = function () {
    document.getElementById("scrollTopBtn").style.display = window.scrollY > 200 ? "block" : "none";
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

document.getElementById("showSellerSignupButton").addEventListener("click", function() {
    document.getElementById("sellerSignupContainer").style.display = "block"; // Show seller sign-up form
    document.getElementById("signupContainer").style.display = "none"; // Hide customer sign-up form
    document.getElementById("loginContainer").style.display = "none"; // Hide login form
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent normal form submission

    // You can add logic to handle the customer sign-up process here

    // Show confirmation message and hide the sign-up form
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("confirmationMessage").style.display = "block";
});

document.getElementById("sellerSignupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent normal form submission

    // You can add logic to handle the seller sign-up process here

    // Show confirmation message and hide the seller sign-up form
    document.getElementById("sellerSignupForm").style.display = "none";
    document.getElementById("sellerConfirmationMessage").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent normal form submission

    // You can add logic to handle the login process here

    // Show login message and hide the login form
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("loginMessage").style.display = "block";
});

// Toggle between forms
document.getElementById("toggleFormButton").addEventListener("click", function() {
    const signupContainer = document.getElementById("signupContainer");
    const loginContainer = document.getElementById("loginContainer");
    const sellerSignupContainer = document.getElementById("sellerSignupContainer");

    if (signupContainer.style.display === "none") {
        signupContainer.style.display = "block"; // Show customer sign-up
        loginContainer.style.display = "none"; // Hide login
        sellerSignupContainer.style.display = "none"; // Hide seller sign-up
        this.textContent = "Switch to Login"; // Update button text
    } else {
        signupContainer.style.display = "none"; // Hide customer sign-up
        loginContainer.style.display = "block"; // Show login
        sellerSignupContainer.style.display = "none"; // Hide seller sign-up
        this.textContent = "Switch to Sign Up"; // Update button text
    }
});

// Optional: Create a button to switch to the seller sign-up form
const switchToSellerSignupButton = document.createElement('button');
switchToSellerSignupButton.textContent = 'Switch to Seller Sign Up';
switchToSellerSignupButton.id = 'switchToSellerButton';
document.body.appendChild(switchToSellerSignupButton);

switchToSellerSignupButton.addEventListener('click', function() {
    document.getElementById("sellerSignupContainer").style.display = "block"; // Show seller sign-up
    document.getElementById("signupContainer").style.display = "none"; // Hide customer sign-up
    document.getElementById("loginContainer").style.display = "none"; // Hide login
});
function makeButtonsActive() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(button => {
        button.classList.add("active");
    });
}

// Existing event listeners for the forms and toggle button
document.getElementById("showSellerSignupButton").addEventListener("click", function() {
    makeButtonsActive(); // Make all buttons active
    document.getElementById("sellerSignupContainer").style.display = "block"; // Show seller sign-up form
    document.getElementById("signupContainer").style.display = "none"; // Hide customer sign-up form
    document.getElementById("loginContainer").style.display = "none"; // Hide login form
});

document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent normal form submission
    makeButtonsActive(); // Make all buttons active

    // Logic for customer sign-up can be added here

    // Show confirmation message and hide the sign-up form
    document.getElementById("signupForm").style.display = "none";
    document.getElementById("confirmationMessage").style.display = "block";
});

document.getElementById("sellerSignupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent normal form submission
    makeButtonsActive(); // Make all buttons active

    // Logic for seller sign-up can be added here

    // Show confirmation message and hide the seller sign-up form
    document.getElementById("sellerSignupForm").style.display = "none";
    document.getElementById("sellerConfirmationMessage").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent normal form submission
    makeButtonsActive(); // Make all buttons active

    // Logic for login can be added here

    // Show login message and hide the login form
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("loginMessage").style.display = "block";
});

// Toggle between forms
document.getElementById("toggleFormButton").addEventListener("click", function() {
    const signupContainer = document.getElementById("signupContainer");
    const loginContainer = document.getElementById("loginContainer");
    const sellerSignupContainer = document.getElementById("sellerSignupContainer");

    if (signupContainer.style.display === "none") {
        makeButtonsActive(); // Make all buttons active
        signupContainer.style.display = "block"; // Show customer sign-up
        loginContainer.style.display = "none"; // Hide login
        sellerSignupContainer.style.display = "none"; // Hide seller sign-up
        this.textContent = "Switch to Login"; // Update button text
    } else {
        makeButtonsActive(); // Make all buttons active
        signupContainer.style.display = "none"; // Hide customer sign-up
        loginContainer.style.display = "block"; // Show login
        sellerSignupContainer.style.display = "none"; // Hide seller sign-up
        this.textContent = "Switch to Sign Up"; // Update button text
    }
});

// Optional: Create a button to switch to the seller sign-up form
const switchToSellerSignupButton = document.createElement('button');
switchToSellerSignupButton.textContent = 'Switch to Seller Sign Up';
switchToSellerSignupButton.id = 'switchToSellerButton';
document.body.appendChild(switchToSellerSignupButton);

switchToSellerSignupButton.addEventListener('click', function() {
    makeButtonsActive(); // Make all buttons active
    document.getElementById("sellerSignupContainer").style.display = "block"; // Show seller sign-up
    document.getElementById("signupContainer").style.display = "none"; // Hide customer sign-up
    document.getElementById("loginContainer").style.display = "none"; // Hide login
});


