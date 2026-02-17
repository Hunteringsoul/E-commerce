const products = [
    {
        name: "Nike Air Max",
        brand: "Nike",
        price: "₹5000",
        category: "Shoes",
        image: "imgs/nike_airmax.jpg"
    },
    {
        name: "Adidas Ultraboost",
        brand: "Adidas",
        price: "₹7000",
        category: "Shoes",
        image: "imgs/adidas_Shoes.jpg"
    },
    {
        name: "Puma Running Shoes",
        brand: "Puma",
        price: "₹4500",
        category: "Shoes",
        image: "imgs/puma.jpg"
    },
    {
        name: "Nike Sports Jacket",
        brand: "Nike",
        price: "₹3500",
        category: "Clothing",
        image: "imgs/nike_jacket.jpg"
    },
    {
        name: "Nike Dunk Low",
        brand: "Nike",
        price: "₹6000",
        category: "Shoes",
        image: "imgs/nike_dunk.jpg"
    },
    {
        name: "Nike Air Force 1",
        brand: "Nike",
        price: "₹5500",
        category: "Shoes",
        image: "imgs/nike_airforce1.jpg"
    },
    {
        name: "Nike Basketball Shoes",
        brand: "Nike",
        price: "₹8000",
        category: "Shoes",
        image: "imgs/nike_basketball_shoes.jpg"
    },
    {
        name: "Adidas Stan Smith",
        brand: "Adidas",
        price: "₹4500",
        category: "Shoes",
        image: "imgs/adidas_Shoes.jpg"
    },
    {
        name: "Adidas Yeezy Boost",
        brand: "Adidas",
        price: "₹12000",
        category: "Shoes",
        image: "imgs/colorful_sneakers.jpg"
    },
    {
        name: "Adidas Gazelle",
        brand: "Adidas",
        price: "₹5000",
        category: "Shoes",
        image: "imgs/adidas_Shoes.jpg"
    },
    {
        name: "Adidas Running Shorts",
        brand: "Adidas",
        price: "₹2500",
        category: "Clothing",
        image: "imgs/colorful_sneakers.jpg"
    },
    {
        name: "Puma Suede Classic",
        brand: "Puma",
        price: "₹4000",
        category: "Shoes",
        image: "imgs/puma.jpg"
    },
    {
        name: "Puma RS-X",
        brand: "Puma",
        price: "₹6500",
        category: "Shoes",
        image: "imgs/puma.jpg"
    },
    {
        name: "Puma Training Shoes",
        brand: "Puma",
        price: "₹4800",
        category: "Shoes",
        image: "imgs/colorful_sneakers.jpg"
    },
    {
        name: "Puma Track Jacket",
        brand: "Puma",
        price: "₹3200",
        category: "Clothing",
        image: "imgs/puma.jpg"
    },
    {
        name: "Nike Zoom Pegasus",
        brand: "Nike",
        price: "₹7500",
        category: "Shoes",
        image: "imgs/nike_latest.jpg"
    },
    {
        name: "Adidas Originals Hoodie",
        brand: "Adidas",
        price: "₹4000",
        category: "Clothing",
        image: "imgs/hoddies.jpg"
    },
    {
        name: "Puma Speedcat",
        brand: "Puma",
        price: "₹5500",
        category: "Shoes",
        image: "imgs/puma.jpg"
    },
    {
        name: "Nike Cortez",
        brand: "Nike",
        price: "₹4500",
        category: "Shoes",
        image: "imgs/nike_unsplash.jpg"
    },
    {
        name: "Adidas Samba",
        brand: "Adidas",
        price: "₹4800",
        category: "Shoes",
        image: "imgs/adidas_Shoes.jpg"
    },
    {
        name: "Puma Future Rider",
        brand: "Puma",
        price: "₹5200",
        category: "Shoes",
        image: "imgs/puma.jpg"
    }
];

let currentBrand = "All";
let currentCategory = "All";
let wishlist = [];
let currentQuickViewProduct = null;
let recentlyViewed = [];
let currentSort = "default";
let minPriceFilter = null;
let maxPriceFilter = null;

function getProductBadge(product) {
    const price = parseInt(product.price.replace("₹", ""), 10) || 0;
    let badges = [];
    
    // New products (first 5)
    const productIndex = products.findIndex(p => p.name === product.name);
    if (productIndex < 5) {
        badges.push('<span class="product-badge badge-new">New</span>');
    }
    
    // Sale badge for products under ₹4000
    if (price < 4000) {
        badges.push('<span class="product-badge badge-sale">Sale</span>');
    }
    
    // Popular badge for products over ₹7000
    if (price > 7000) {
        badges.push('<span class="product-badge badge-popular">Popular</span>');
    }
    
    return badges.join('');
}

function getStockStatus(product) {
    // Simulate stock - randomly assign stock status
    const price = parseInt(product.price.replace("₹", ""), 10) || 0;
    if (price > 10000) {
        return '<span class="stock-status stock-low">Low Stock</span>';
    }
    return '<span class="stock-status stock-in">In Stock</span>';
}

function displayProducts(filteredProducts) {
    const container = document.getElementById("productContainer");
    if (!container) return;

    // Apply sorting
    let sortedProducts = [...filteredProducts];
    if (currentSort === "price-low") {
        sortedProducts.sort((a, b) => {
            const priceA = parseInt(a.price.replace("₹", ""), 10) || 0;
            const priceB = parseInt(b.price.replace("₹", ""), 10) || 0;
            return priceA - priceB;
        });
    } else if (currentSort === "price-high") {
        sortedProducts.sort((a, b) => {
            const priceA = parseInt(a.price.replace("₹", ""), 10) || 0;
            const priceB = parseInt(b.price.replace("₹", ""), 10) || 0;
            return priceB - priceA;
        });
    } else if (currentSort === "name") {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Apply price filter
    if (minPriceFilter !== null || maxPriceFilter !== null) {
        sortedProducts = sortedProducts.filter(product => {
            const price = parseInt(product.price.replace("₹", ""), 10) || 0;
            if (minPriceFilter !== null && price < minPriceFilter) return false;
            if (maxPriceFilter !== null && price > maxPriceFilter) return false;
            return true;
        });
    }

    container.innerHTML = "";

    if (sortedProducts.length === 0) {
        container.innerHTML = '<p class="no-products">No products found. Try adjusting your filters.</p>';
        return;
    }

    sortedProducts.forEach((product, index) => {
        const isWishlisted = wishlist.some(item => item.name === product.name);
        const badges = getProductBadge(product);
        const stockStatus = getStockStatus(product);
        
        container.innerHTML += `
            <div class="product-card" data-index="${index}">
                <div class="image-wrapper">
                    ${badges}
                    <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy">
                    <button class="wishlist-heart ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist(${index}, event)" title="Add to wishlist">❤️</button>
                    <button class="quick-view-btn" onclick="openQuickView(${index}, event)">Quick View</button>
                </div>
                <h3>${product.name}</h3>
                <p>${product.price}</p>
                ${stockStatus}
                <button class="shop-btn add-cart-btn" type="button">Add to Cart</button>
            </div>
        `;
    });

    // Attach events after rendering
    container.querySelectorAll(".product-card").forEach((card) => {
        const idx = Number(card.getAttribute("data-index"));
        const product = sortedProducts[idx];

        const img = card.querySelector(".product-img");
        if (img) {
            img.addEventListener("click", () => {
                openModal(product);
                addToRecentlyViewed(product);
            });
            img.addEventListener("mouseenter", () => showQuickViewHint(card));
        }

        const addBtn = card.querySelector(".add-cart-btn");
        if (addBtn) addBtn.addEventListener("click", () => {
            addToCart(product);
            addToRecentlyViewed(product);
        });
    });
}

function filterProducts(brand) {
    currentBrand = brand;
    applyFilters();
}

function filterCategory(category) {
    currentCategory = category;
    applyFilters();
}

function applyFilters() {
    let filtered = products.slice();

    if (currentBrand !== "All") {
        filtered = filtered.filter((p) => p.brand === currentBrand);
    }
    if (currentCategory !== "All") {
        filtered = filtered.filter((p) => p.category === currentCategory);
    }

    displayProducts(filtered);
}

function handleSort() {
    currentSort = document.getElementById("sortSelect").value;
    applyFilters();
}

function applyPriceFilter() {
    const minInput = document.getElementById("minPrice");
    const maxInput = document.getElementById("maxPrice");
    
    minPriceFilter = minInput.value ? parseInt(minInput.value, 10) : null;
    maxPriceFilter = maxInput.value ? parseInt(maxInput.value, 10) : null;
    
    applyFilters();
}

// Recently Viewed functionality
function loadRecentlyViewed() {
    try {
        const saved = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
        if (Array.isArray(saved)) {
            recentlyViewed = saved.slice(0, 4); // Keep only last 4
        } else {
            recentlyViewed = [];
        }
    } catch {
        recentlyViewed = [];
    }
    displayRecentlyViewed();
}

function saveRecentlyViewed() {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
}

function addToRecentlyViewed(product) {
    // Remove if already exists
    recentlyViewed = recentlyViewed.filter(item => item.name !== product.name);
    // Add to beginning
    recentlyViewed.unshift(product);
    // Keep only last 4
    recentlyViewed = recentlyViewed.slice(0, 4);
    saveRecentlyViewed();
    displayRecentlyViewed();
}

function displayRecentlyViewed() {
    const section = document.getElementById("recentlyViewed");
    const container = document.getElementById("recentlyViewedItems");
    
    if (!section || !container) return;
    
    if (recentlyViewed.length === 0) {
        section.style.display = "none";
        return;
    }
    
    section.style.display = "block";
    container.innerHTML = "";
    
    recentlyViewed.forEach((product, index) => {
        container.innerHTML += `
            <div class="recent-product-card">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>${product.price}</p>
                <button class="shop-btn" onclick="addToCartFromRecent(${index})">Add to Cart</button>
            </div>
        `;
    });
}

function addToCartFromRecent(index) {
    if (recentlyViewed[index]) {
        addToCart(recentlyViewed[index]);
    }
}

// Back to Top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function initBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");
    if (!backToTopBtn) return;
    
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = "flex";
        } else {
            backToTopBtn.style.display = "none";
        }
    });
}

function scrollToProducts() {
    const productsSection = document.getElementById("products");
    if (!productsSection) return;
    productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openModal(product) {
    const img = document.getElementById("modalImage");
    const title = document.getElementById("modalTitle");
    const price = document.getElementById("modalPrice");
    const modal = document.getElementById("productModal");

    if (img) img.src = product.image;
    if (title) title.innerText = product.name;
    if (price) price.innerText = product.price;
    if (modal) modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("productModal");
    if (modal) modal.style.display = "none";
}

let cart = [];

function isUserLoggedIn() {
    return !!getCurrentUser();
}

function requireLogin(actionDescription) {
    if (!isUserLoggedIn()) {
        showToast(`Please login to ${actionDescription}.`);
        setTimeout(() => {
            window.location.href = "login.html";
        }, 600);
        return false;
    }
    return true;
}

function loadCartFromStorage() {
    // Only load a cart for logged-in users
    if (!isUserLoggedIn()) {
        cart = [];
        updateCartCount();
        displayCart();
        hydrateCheckout();
        return;
    }

    try {
        const saved = JSON.parse(localStorage.getItem("cart") || "[]");
        if (Array.isArray(saved)) {
            cart = saved;
        } else {
            cart = [];
        }
    } catch {
        cart = [];
    }
    updateCartCount();
    displayCart();
    hydrateCheckout();
}

function saveCart() {
    if (!isUserLoggedIn()) return;
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product) {
    if (!requireLogin("add items to your cart")) return;
    const existing = cart.find((item) => item.name === product.name);

    if (existing) {
        existing.quantity = (existing.quantity || 1) + 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    saveCart();
    updateCartCount();
    displayCart();
    hydrateCheckout();
}

function updateCartCount() {
    const el = document.getElementById("cartCount");
    if (el) el.innerText = cart.length.toString();
}

function openCart(){
    if (!requireLogin("view your cart")) return;

    document.getElementById("cartDrawer").classList.add("open");
    
    document.getElementById("mainContent").classList.add("cart-open");
    
    }
    
    

    
function closeCart(){

    document.getElementById("cartDrawer").classList.remove("open");
    
    document.getElementById("mainContent").classList.remove("cart-open");
    
    }
        

function displayCart() {
    const container = document.getElementById("cartItems");
    const totalEl = document.getElementById("cartTotal");
    if (!container || !totalEl) return;

    container.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const price = parseInt(item.price.replace("₹", ""), 10) || 0;
        const qty = item.quantity || 1;
        total += price * qty;

        container.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>
                    ₹${price} x 
                    <button type="button" onclick="changeQty(${index}, -1)">-</button>
                    ${qty}
                    <button type="button" onclick="changeQty(${index}, 1)">+</button>
                </p>
                <button type="button" onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalEl.innerText = total.toString();
}

function changeQty(index, change) {
    if (!cart[index]) return;

    const currentQty = cart[index].quantity || 1;
    const nextQty = currentQty + change;

    if (nextQty <= 0) {
        cart.splice(index, 1);
    } else {
        cart[index].quantity = nextQty;
    }

    updateCart();
}

function removeItem(index) {
    if (!cart[index]) return;
    cart.splice(index, 1);
    updateCart();
}

function goToCheckout() {
    if (!requireLogin("checkout")) return;

    if (!cart || cart.length === 0) {
        showToast("Your cart is empty. Add a few products before checking out.");
        return;
    }
    window.location.href = "checkout.html";
}

function hydrateCheckout() {
    const itemsEl = document.getElementById("checkoutItems");
    const totalEl = document.getElementById("checkoutTotal");
    if (!itemsEl || !totalEl) return;

    const formEl = document.querySelector(".checkout-form");
    const placeBtn = document.querySelector(".checkout-primary-btn");

    itemsEl.innerHTML = "";
    let total = 0;

    if (!cart || cart.length === 0) {
        itemsEl.innerHTML = `<p class="checkout-empty">Your cart is empty. Head back to products and add something you like.</p>`;
        totalEl.innerText = "0";
        if (formEl && placeBtn) {
            formEl.classList.add("checkout-disabled");
            placeBtn.disabled = true;
        }
        return;
    }

    if (formEl && placeBtn) {
        formEl.classList.remove("checkout-disabled");
        placeBtn.disabled = false;
    }

    cart.forEach((item) => {
        const price = parseInt(item.price.replace("₹", ""), 10) || 0;
        const qty = item.quantity || 1;
        const lineTotal = price * qty;
        total += lineTotal;
        itemsEl.innerHTML += `
            <div class="checkout-item-row">
                <div class="checkout-item-info">
                    <img class="checkout-item-thumb" src="${item.image}" alt="${item.name}" loading="lazy">
                    <div>
                        <div class="checkout-item-name">${item.name}</div>
                        <div class="checkout-item-meta">₹${price} × ${qty}</div>
                    </div>
                </div>
                <span>₹${lineTotal}</span>
            </div>
        `;
    });

    totalEl.innerText = total.toString();
}

function placeOrder() {
    if (!requireLogin("place an order")) return;

    // Build order object
    let total = 0;
    const items = cart.map(item => {
        const price = parseInt(item.price.replace("₹", ""), 10) || 0;
        const qty = item.quantity || 1;
        total += price * qty;
        return { name: item.name, price: item.price, quantity: qty, image: item.image };
    });

    const order = {
        id: Date.now(),
        items,
        total,
        placedAt: new Date().toISOString()
    };

    // Persist order to user profile
    const user = getCurrentUser();
    if (user) {
        if (!user.orderHistory) user.orderHistory = [];
        user.orderHistory.unshift(order);
        setCurrentUser(user);

        const allUsers = JSON.parse(localStorage.getItem("users") || "[]");
        const userIndex = allUsers.findIndex(u => u.email === user.email);
        if (userIndex > -1) {
            if (!allUsers[userIndex].orderHistory) allUsers[userIndex].orderHistory = [];
            allUsers[userIndex].orderHistory.unshift(order);
            localStorage.setItem("users", JSON.stringify(allUsers));
        }
    }

    alert("Order placed successfully!");
    cart = [];
    saveCart();
    updateCartCount();
    displayCart();
    hydrateCheckout();
    window.location.href = "index.html";
}

function initTestimonialCarousel() {
    const track = document.querySelector(".testimonial-track");
    if (!track) return;

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    let currentIndex = 0;

    function goToSlide(index) {
        const total = slides.length;
        currentIndex = (index + total) % total;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    const prevBtn = document.querySelector(".testimonial-arrow.prev");
    const nextBtn = document.querySelector(".testimonial-arrow.next");

    function handlePrev() {
        goToSlide(currentIndex - 1);
        resetAuto();
    }

    function handleNext() {
        goToSlide(currentIndex + 1);
        resetAuto();
    }

    if (prevBtn) prevBtn.addEventListener("click", handlePrev);
    if (nextBtn) nextBtn.addEventListener("click", handleNext);

    let autoId = setInterval(() => goToSlide(currentIndex + 1), 6000);

    function resetAuto() {
        clearInterval(autoId);
        autoId = setInterval(() => goToSlide(currentIndex + 1), 6000);
    }

    goToSlide(0);
}

// Search functionality
function handleSearch(event) {
    if (event.key === 'Enter' || event.type === 'keyup') {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
        if (!searchTerm) {
            applyFilters();
            return;
        }
        
        const filtered = products.filter(p => 
            p.name.toLowerCase().includes(searchTerm) ||
            p.brand.toLowerCase().includes(searchTerm) ||
            p.category.toLowerCase().includes(searchTerm)
        );
        displayProducts(filtered);
        
        // Scroll to products
        const productsSection = document.getElementById("products");
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
}

// Quick View functionality
function openQuickView(index, event) {
    if (event) event.stopPropagation();
    const filtered = getFilteredProducts();
    // Apply same sorting/filtering as displayProducts
    let sortedFiltered = [...filtered];
    if (currentSort === "price-low") {
        sortedFiltered.sort((a, b) => {
            const priceA = parseInt(a.price.replace("₹", ""), 10) || 0;
            const priceB = parseInt(b.price.replace("₹", ""), 10) || 0;
            return priceA - priceB;
        });
    } else if (currentSort === "price-high") {
        sortedFiltered.sort((a, b) => {
            const priceA = parseInt(a.price.replace("₹", ""), 10) || 0;
            const priceB = parseInt(b.price.replace("₹", ""), 10) || 0;
            return priceB - priceA;
        });
    } else if (currentSort === "name") {
        sortedFiltered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    if (minPriceFilter !== null || maxPriceFilter !== null) {
        sortedFiltered = sortedFiltered.filter(product => {
            const price = parseInt(product.price.replace("₹", ""), 10) || 0;
            if (minPriceFilter !== null && price < minPriceFilter) return false;
            if (maxPriceFilter !== null && price > maxPriceFilter) return false;
            return true;
        });
    }
    
    const product = sortedFiltered[index];
    if (!product) return;
    
    currentQuickViewProduct = product;
    addToRecentlyViewed(product);
    document.getElementById("quickViewImage").src = product.image;
    document.getElementById("quickViewTitle").innerText = product.name;
    document.getElementById("quickViewPrice").innerText = product.price;
    document.getElementById("quickViewBrand").innerText = `${product.brand} · ${product.category}`;
    
    const isWishlisted = wishlist.some(item => item.name === product.name);
    const wishlistBtn = document.getElementById("quickViewWishlistBtn");
    if (wishlistBtn) {
        wishlistBtn.innerText = isWishlisted ? "❤️ Remove from Wishlist" : "❤️ Add to Wishlist";
        wishlistBtn.classList.toggle("active", isWishlisted);
    }
    
    document.getElementById("quickViewModal").style.display = "flex";
}

function closeQuickView() {
    document.getElementById("quickViewModal").style.display = "none";
    currentQuickViewProduct = null;
}

function addToCartFromQuickView() {
    if (currentQuickViewProduct) {
        addToCart(currentQuickViewProduct);
        showToast("Added to cart!");
    }
}

function toggleWishlistFromQuickView() {
    if (currentQuickViewProduct) {
        toggleWishlist(null, null, currentQuickViewProduct);
    }
}

function showQuickViewHint(card) {
    // Optional: show hint on hover
}

function getFilteredProducts() {
    let filtered = products.slice();
    if (currentBrand !== "All") {
        filtered = filtered.filter((p) => p.brand === currentBrand);
    }
    if (currentCategory !== "All") {
        filtered = filtered.filter((p) => p.category === currentCategory);
    }
    return filtered;
}

// Wishlist functionality
function loadWishlistFromStorage() {
    try {
        const saved = JSON.parse(localStorage.getItem("wishlist") || "[]");
        if (Array.isArray(saved)) {
            wishlist = saved;
        } else {
            wishlist = [];
        }
    } catch {
        wishlist = [];
    }
    updateWishlistCount();
    displayWishlist();
}

function saveWishlist() {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function toggleWishlist(index, event, product = null) {
    if (!requireLogin("manage your wishlist")) return;
    if (event) event.stopPropagation();
    
    let targetProduct = product;
    if (!targetProduct && index !== null) {
        const filtered = getFilteredProducts();
        targetProduct = filtered[index];
    }
    
    if (!targetProduct) return;
    
    const existingIndex = wishlist.findIndex(item => item.name === targetProduct.name);
    
    if (existingIndex >= 0) {
        wishlist.splice(existingIndex, 1);
        showToast("Removed from wishlist");
    } else {
        wishlist.push({ ...targetProduct });
        showToast("Added to wishlist!");
    }
    
    saveWishlist();
    updateWishlistCount();
    displayWishlist();
    
    // Update heart icon if clicked from product card
    if (event && event.target) {
        event.target.classList.toggle("active");
    }
    
    // Refresh products to update heart states
    applyFilters();
}

function updateWishlistCount() {
    const el = document.getElementById("wishlistCount");
    if (el) el.innerText = wishlist.length.toString();
}

function displayWishlist() {
    const container = document.getElementById("wishlistItems");
    const emptyEl = document.getElementById("wishlistEmpty");
    if (!container || !emptyEl) return;
    
    if (wishlist.length === 0) {
        container.innerHTML = "";
        emptyEl.style.display = "block";
        return;
    }
    
    emptyEl.style.display = "none";
    container.innerHTML = "";
    
    wishlist.forEach((item, index) => {
        const itemId = `wishlist-item-${index}`;
        container.innerHTML += `
            <div class="wishlist-item" data-item-index="${index}">
                <img src="${item.image}" alt="${item.name}" class="wishlist-item-img">
                <div class="wishlist-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                <div class="wishlist-item-actions">
                    <button class="shop-btn" onclick="addToCartFromWishlist(${index})">Add to Cart</button>
                    <button class="remove-wishlist-btn" onclick="removeFromWishlist(${index})">✖</button>
                </div>
            </div>
        `;
    });
}

function removeFromWishlist(index) {
    wishlist.splice(index, 1);
    saveWishlist();
    updateWishlistCount();
    displayWishlist();
    applyFilters();
}

function addToCartFromWishlist(index) {
    if (wishlist[index]) {
        addToCart(wishlist[index]);
        showToast("Added to cart!");
    }
}

function openWishlist() {
    if (!requireLogin("view your wishlist")) return;
    document.getElementById("wishlistDrawer").classList.add("open");
    document.getElementById("mainContent").classList.add("wishlist-open");
}

function closeWishlist() {
    document.getElementById("wishlistDrawer").classList.remove("open");
    document.getElementById("mainContent").classList.remove("wishlist-open");
}

// Newsletter functionality
function handleNewsletter() {
    const email = document.getElementById("newsletterEmail").value;
    if (!email) return;
    
    // In a real app, you'd send this to your backend
    showToast("Thanks for subscribing! We'll keep you updated.");
    document.getElementById("newsletterEmail").value = "";
}

// Toast notification
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add("show"), 10);
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// User Authentication Functions
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem("currentUser") || "null");
    } catch {
        return null;
    }
}

function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

function handleLogin() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;

    // Get all registered users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        // Set current user
        const userData = {
            name: user.name,
            email: user.email,
            joinDate: user.joinDate,
            preferences: user.preferences || {}
        };
        setCurrentUser(userData);
        
        if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
        }
        
        showToast("Welcome back, " + user.name + "!");
        setTimeout(() => {
            window.location.href = "index.html";
        }, 500);
    } else {
        showToast("Invalid email or password. Please try again.");
    }
}

function handleSignup() {
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirmPassword").value;

    if (password !== confirmPassword) {
        showToast("Passwords do not match!");
        return;
    }

    if (password.length < 6) {
        showToast("Password must be at least 6 characters!");
        return;
    }

    // Get existing users
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        showToast("Email already registered. Please login instead.");
        return;
    }

    // Create new user
    const newUser = {
        name: name,
        email: email,
        password: password,
        joinDate: new Date().toISOString(),
        preferences: {
            favoriteBrands: [],
            favoriteCategories: [],
            notifications: true
        }
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login
    setCurrentUser({
        name: newUser.name,
        email: newUser.email,
        joinDate: newUser.joinDate,
        preferences: newUser.preferences
    });

    showToast("Account created successfully! Welcome to Sportify!");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

function handleLogout() {
    // Clear in-memory cart
    cart = [];
    saveCart();
    updateCartCount();
    displayCart();
    hydrateCheckout();

    // Remove logged-in user
    localStorage.removeItem("currentUser");

    // Also clear any auxiliary active-user keys used by older code
    localStorage.removeItem('currentUser');

    showToast("Logged out successfully");
    setTimeout(() => {
        window.location.href = "index.html";
    }, 500);
}

// expose to global so inline onclick="handleLogout()" works
window.handleLogout = handleLogout;

function updateUserNav() {
    const user = getCurrentUser();
    const userMenu = document.getElementById("userMenu");
    const loginBtn = document.getElementById("loginBtn");
    const userName = document.getElementById("userName");

    if (user && userMenu && userName) {
        userMenu.style.display = "flex";
        if (loginBtn) loginBtn.style.display = "none";
        userName.textContent = user.name.split(" ")[0]; // First name only
    } else if (loginBtn) {
        loginBtn.style.display = "block";
        if (userMenu) userMenu.style.display = "none";
    }
}

function initUserMenuToggle() {
    const userMenu = document.getElementById("userMenu");
    if (!userMenu) return;

    // Toggle on click
    userMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        userMenu.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", () => {
        userMenu.classList.remove("open");
    });
}

function personalizeExperience() {
    const user = getCurrentUser();
    if (!user) return;

    // Show personalized greeting
    const heroContent = document.querySelector(".hero-content");
    if (heroContent && user.preferences && !user.preferences.greetingShown) {
        const greeting = document.createElement("p");
        greeting.className = "personalized-greeting";
        greeting.textContent = `Welcome back, ${user.name.split(" ")[0]}!`;
        greeting.style.cssText = "font-size: 16px; margin-bottom: 10px; opacity: 0.9;";
        heroContent.insertBefore(greeting, heroContent.querySelector("h2"));
        user.preferences.greetingShown = true;
        setCurrentUser(user);
    }

    // Load user's favorite brands/categories if any
    if (user.preferences.favoriteBrands && user.preferences.favoriteBrands.length > 0) {
        // Could auto-filter to favorite brands
    }
}

// Per-user cart persistence (cart stays until explicit logout)
const CART_KEY = 'cart'; // active cart shown in UI
const CURRENT_USER_KEY = 'currentUser';

function getActiveUser() {
    try { return JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null'); }
    catch { return null; }
}
function setActiveUser(user) {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
}
function userCartKey(userId) {
    return `user_cart_${userId}`;
}

function getCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch { return []; }
}

// Persist active cart to CART_KEY and also to per-user storage when logged in.
// This ensures cart survives refreshes and remains until logout.
function setCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    const user = getActiveUser();
    if (user) {
        try { localStorage.setItem(userCartKey(user.id ?? user.username), JSON.stringify(cart)); }
        catch {}
    }
    if (typeof renderCart === 'function') renderCart();
}

function saveCartToUser(user) {
    if (!user) return;
    const key = userCartKey(user.id ?? user.username);
    localStorage.setItem(key, JSON.stringify(getCart()));
}

function loadCartForUser(user) {
    if (!user) return;
    const key = userCartKey(user.id ?? user.username);
    const raw = localStorage.getItem(key);
    if (raw) {
        try {
            // If there's already an active cart (e.g. user added items before reload), keep it.
            const active = getCart();
            if (!active || active.length === 0) {
                setCart(JSON.parse(raw));
            } else {
                // keep active cart as-is but ensure user's storage is updated
                localStorage.setItem(key, JSON.stringify(active));
            }
            return;
        } catch {}
    }
    // No saved user cart -> leave active cart as-is (don't clear)
}

// Call on logout: persist then clear active slot so UI shows empty for next visitor
function logout() {
    const user = getActiveUser();
    if (user) saveCartToUser(user);
    setActiveUser(null);
    setCart([]); // clear active visible cart on logout
}

// Call on login with user object: set active user and restore their cart if no active cart present
function login(user) {
    setActiveUser(user);
    loadCartForUser(user);
    location.reload();
}

// Ensure on startup active cart is present. If user logged in, restore if active cart empty.
document.addEventListener('DOMContentLoaded', () => {
    const user = getActiveUser();
    if (user) loadCartForUser(user);
    else {
        // guest: ensure CART_KEY exists (do not clear)
        if (!localStorage.getItem(CART_KEY)) localStorage.setItem(CART_KEY, JSON.stringify([]));
    }

    // wire logout button if present
    const logoutBtn = document.querySelector('#logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', logout);
});

// Helper example for adding items: always use setCart so persistence happens automatically
function addItemToCart(item) {
    const cart = getCart();
    const existing = cart.find(i => i.id === item.id);
    if (existing) existing.qty = (existing.qty || 1) + (item.qty || 1);
    else cart.push({ ...item, qty: item.qty || 1 });
    setCart(cart);
}

document.addEventListener("DOMContentLoaded", () => {
    // Only run main functions if on index page
    if (document.getElementById("productContainer")) {
        applyFilters();

        const heroBtn = document.querySelector(".hero-btn");
        if (heroBtn) {
            heroBtn.addEventListener("click", scrollToProducts);
        }

        loadCartFromStorage();
        loadWishlistFromStorage();
        loadRecentlyViewed();
        initTestimonialCarousel();
        initBackToTop();
        updateUserNav();
        personalizeExperience();
        initUserMenuToggle();
        
        // Close modals on outside click
        window.addEventListener("click", (e) => {
            const quickViewModal = document.getElementById("quickViewModal");
            if (e.target === quickViewModal) {
                closeQuickView();
            }
        });
    } else {
        // On login/signup/profile pages
        updateUserNav();
        initUserMenuToggle();
        
        // Auto-fill remembered email
        const rememberedEmail = localStorage.getItem("rememberedEmail");
        const loginEmail = document.getElementById("loginEmail");
        if (rememberedEmail && loginEmail) {
            loginEmail.value = rememberedEmail;
        }
    }
});

