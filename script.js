// ===== Product Data =====
const products = [
  {
    id: 1,
    title: "Ribbed Knit Bodycon Dress",
    price: 12.99,
    original: 29.99,
    discount: 57,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80",
    category: "women",
    badge: "-57%"
  },
  {
    id: 2,
    title: "Oversized Graphic Tee",
    price: 9.49,
    original: 19.99,
    discount: 53,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80",
    category: "women",
    badge: "-53%"
  },
  {
    id: 3,
    title: "High-Waist Wide Leg Jeans",
    price: 18.99,
    original: 39.99,
    discount: 53,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&q=80",
    category: "women",
    badge: "-53%"
  },
  {
    id: 4,
    title: "Satin Slip Midi Skirt",
    price: 14.99,
    original: 32.00,
    discount: 53,
    image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=500&q=80",
    category: "women",
    badge: "-53%"
  },
  {
    id: 5,
    title: "Cropped Puffer Jacket",
    price: 24.99,
    original: 59.99,
    discount: 58,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&q=80",
    category: "women",
    badge: "NEW"
  },
  {
    id: 6,
    title: "Floral Print Maxi Dress",
    price: 16.99,
    original: 35.99,
    discount: 53,
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e9201?w=500&q=80",
    category: "women",
    badge: "-53%"
  },
  {
    id: 7,
    title: "Classic Leather Sneakers",
    price: 29.99,
    original: 69.99,
    discount: 57,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80",
    category: "men",
    badge: "-57%"
  },
  {
    id: 8,
    title: "Relaxed Fit Cargo Pants",
    price: 22.49,
    original: 48.00,
    discount: 53,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500&q=80",
    category: "men",
    badge: "-53%"
  },
  {
    id: 9,
    title: "Striped Button-Up Shirt",
    price: 15.99,
    original: 34.99,
    discount: 54,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80",
    category: "men",
    badge: "NEW"
  },
  {
    id: 10,
    title: "Hooded Sweatshirt",
    price: 19.99,
    original: 42.00,
    discount: 52,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80",
    category: "men",
    badge: "-52%"
  },
  {
    id: 11,
    title: "Mini Crossbody Bag",
    price: 11.99,
    original: 25.99,
    discount: 54,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    category: "women",
    badge: "-54%"
  },
  {
    id: 12,
    title: "Chunky Platform Boots",
    price: 34.99,
    original: 79.99,
    discount: 56,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500&q=80",
    category: "women",
    badge: "-56%"
  }
];

// ===== State =====
let cart = JSON.parse(localStorage.getItem('sheen_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('sheen_wishlist')) || [];

// ===== DOM Elements =====
const cartCountEl = document.getElementById('cart-count');
const wishlistCountEl = document.getElementById('wishlist-count');
const cartDrawer = document.getElementById('cart-drawer');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const drawerCountEl = document.getElementById('drawer-count');
const overlay = document.getElementById('overlay');
const mobileMenu = document.getElementById('mobile-menu');

// ===== Render Products =====
function createProductCard(product) {
  const isWishlisted = wishlist.includes(product.id);
  const badgeClass = product.badge === 'NEW' ? 'new' : '';
  
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}" loading="lazy">
        <span class="product-badge ${badgeClass}">${product.badge}</span>
        <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="Add to wishlist">
          <svg viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <div class="product-price">
          <span class="price-current">$${product.price.toFixed(2)}</span>
          <span class="price-original">$${product.original.toFixed(2)}</span>
          <span class="price-discount">${product.discount}% OFF</span>
        </div>
        <button class="add-cart-btn" data-id="${product.id}">Add to Cart</button>
      </div>
    </div>
  `;
}

function renderProducts() {
  const flashEl = document.getElementById('flash-products');
  const newEl = document.getElementById('new-products');
  const bestEl = document.getElementById('best-products');
  const womenEl = document.getElementById('women-products');

  // Flash sale - first 4
  flashEl.innerHTML = products.slice(0, 4).map(createProductCard).join('');
  
  // New In - items with NEW badge + others
  const newItems = products.filter(p => p.badge === 'NEW').concat(products.slice(4, 8));
  newEl.innerHTML = newItems.slice(0, 4).map(createProductCard).join('');
  
  // Best sellers - mixed
  bestEl.innerHTML = [products[0], products[2], products[6], products[11]].map(createProductCard).join('');
  
  // Women
  womenEl.innerHTML = products.filter(p => p.category === 'women').slice(0, 4).map(createProductCard).join('');
}

// ===== Cart Functions =====
function saveCart() {
  localStorage.setItem('sheen_cart', JSON.stringify(cart));
  updateCartUI();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;
  
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  
  // Brief feedback
  const btn = document.querySelector(`.add-cart-btn[data-id="${id}"]`);
  if (btn) {
    const original = btn.textContent;
    btn.textContent = 'Added ✓';
    btn.style.background = 'var(--green)';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
    }, 1000);
  }
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(id);
  } else {
    saveCart();
  }
}

function updateCartUI() {
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  
  cartCountEl.textContent = totalItems;
  cartCountEl.dataset.count = totalItems;
  drawerCountEl.textContent = totalItems;
  cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
  
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
  } else {
    cartItemsEl.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="minus" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" data-action="plus" data-id="${item.id}">+</button>
          </div>
          <button class="remove-item" data-id="${item.id}">Remove</button>
        </div>
      </div>
    `).join('');
  }
}

// ===== Wishlist =====
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem('sheen_wishlist', JSON.stringify(wishlist));
  wishlistCountEl.textContent = wishlist.length;
  wishlistCountEl.dataset.count = wishlist.length;
  
  // Update heart icons
  document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('active');
    const svg = btn.querySelector('svg');
    svg.setAttribute('fill', btn.classList.contains('active') ? 'currentColor' : 'none');
  });
}

// ===== Hero Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('hero-dots');

function initSlider() {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `hero-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  setInterval(nextSlide, 5000);
}

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dotsContainer.children[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dotsContainer.children[currentSlide].classList.add('active');
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

// ===== Countdown Timer =====
function startCountdown() {
  // Set end time to ~4.5 hours from now for demo
  let totalSeconds = 4 * 3600 + 32 * 60 + 18;
  
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  function tick() {
    if (totalSeconds <= 0) {
      totalSeconds = 5 * 3600; // reset for demo
    }
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    hoursEl.textContent = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
    
    totalSeconds--;
  }
  
  tick();
  setInterval(tick, 1000);
}

// ===== Event Listeners =====
document.addEventListener('click', (e) => {
  // Add to cart
  if (e.target.classList.contains('add-cart-btn')) {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
  
  // Wishlist
  if (e.target.closest('.wishlist-btn')) {
    const btn = e.target.closest('.wishlist-btn');
    const id = parseInt(btn.dataset.id);
    toggleWishlist(id);
  }
  
  // Cart qty / remove
  if (e.target.classList.contains('qty-btn')) {
    const id = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    updateQty(id, action === 'plus' ? 1 : -1);
  }
  if (e.target.classList.contains('remove-item')) {
    const id = parseInt(e.target.dataset.id);
    removeFromCart(id);
  }
  
  // Open cart
  if (e.target.closest('.cart-btn')) {
    e.preventDefault();
    cartDrawer.classList.add('open');
    overlay.classList.add('show');
  }
  
  // Close cart
  if (e.target.classList.contains('close-cart') || e.target.classList.contains('continue-shopping') || e.target === overlay) {
    cartDrawer.classList.remove('open');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
  }
  
  // Mobile menu
  if (e.target.closest('.mobile-menu-btn')) {
    mobileMenu.classList.add('open');
    overlay.classList.add('show');
  }
  if (e.target.classList.contains('close-menu')) {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
  }
  
  // Promo close
  if (e.target.classList.contains('promo-close')) {
    document.querySelector('.promo-bar').style.display = 'none';
  }
  
  // Checkout demo
  if (e.target.id === 'checkout-btn') {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Thanks for shopping with SHEEN!\n\nThis is a demo site.\nOrder total: $${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}\n\nIn a real site this would go to payment.`);
  }
});

// Newsletter
document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  alert(`Thanks for subscribing with ${email}!\nYou'll receive exclusive offers.`);
  e.target.reset();
});

// Search (demo)
document.getElementById('search-input')?.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const q = e.target.value.trim();
    if (q) alert(`Searching for "${q}"...\n\nThis is a demo – no real search backend.`);
  }
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  wishlistCountEl.textContent = wishlist.length;
  wishlistCountEl.dataset.count = wishlist.length;
  initSlider();
  startCountdown();
});
