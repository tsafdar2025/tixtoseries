// ===== Product Data - Tixto Clothes - Premium Polo Shirts =====
const products = [
  {
    id: 1,
    title: "Classic Navy Polo",
    price: 29.99,
    original: 39.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&q=80",
    category: "polo",
    badge: "-15%",
    color: "Navy"
  },
  {
    id: 2,
    title: "Crisp White Polo",
    price: 27.99,
    original: 39.99,
    discount: 30,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80",
    category: "polo",
    badge: "-20%",
    color: "White"
  },
  {
    id: 3,
    title: "Black Classic Polo",
    price: 29.99,
    original: 39.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=80",
    category: "polo",
    badge: "-15%",
    color: "Black"
  },
  {
    id: 4,
    title: "Burgundy Polo",
    price: 31.99,
    original: 42.99,
    discount: 26,
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&q=80",
    category: "polo",
    badge: "-18%",
    color: "Burgundy"
  },
  {
    id: 5,
    title: "Forest Green Polo",
    price: 29.99,
    original: 39.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&q=80",
    category: "polo",
    badge: "NEW",
    color: "Forest Green"
  },
  {
    id: 6,
    title: "Sky Blue Polo",
    price: 27.99,
    original: 39.99,
    discount: 30,
    image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=80",
    category: "polo",
    badge: "-20%",
    color: "Sky Blue"
  },
  {
    id: 7,
    title: "Heather Grey Polo",
    price: 26.99,
    original: 37.99,
    discount: 29,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80",
    category: "polo",
    badge: "-18%",
    color: "Heather Grey"
  },
  {
    id: 8,
    title: "Mustard Polo",
    price: 28.99,
    original: 39.99,
    discount: 28,
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&q=80",
    category: "polo",
    badge: "-18%",
    color: "Mustard"
  },
  {
    id: 9,
    title: "Soft Pink Polo",
    price: 27.99,
    original: 39.99,
    discount: 30,
    image: "https://images.unsplash.com/photo-1489987707025-941f350c803b?w=600&q=80",
    category: "polo",
    badge: "NEW",
    color: "Soft Pink"
  },
  {
    id: 10,
    title: "Olive Green Polo",
    price: 29.99,
    original: 42.99,
    discount: 30,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80",
    category: "polo",
    badge: "-20%",
    color: "Olive"
  }
];

// ===== State =====
let cart = JSON.parse(localStorage.getItem('tixto_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('tixto_wishlist')) || [];

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

  if (flashEl) flashEl.innerHTML = products.slice(0, 4).map(createProductCard).join('');
  if (newEl) newEl.innerHTML = products.filter(p => p.badge === 'NEW').concat(products.slice(2, 6)).slice(0, 4).map(createProductCard).join('');
  if (bestEl) bestEl.innerHTML = [products[0], products[2], products[5], products[9]].map(createProductCard).join('');
  if (womenEl) womenEl.innerHTML = products.slice(4, 8).map(createProductCard).join('');
}

// ===== Cart Functions =====
function saveCart() {
  localStorage.setItem('tixto_cart', JSON.stringify(cart));
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
  
  if (cartCountEl) {
    cartCountEl.textContent = totalItems;
    cartCountEl.dataset.count = totalItems;
  }
  if (drawerCountEl) drawerCountEl.textContent = totalItems;
  if (cartTotalEl) cartTotalEl.textContent = `$${totalPrice.toFixed(2)}`;
  
  if (cartItemsEl) {
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
}

// ===== Wishlist =====
function toggleWishlist(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
  } else {
    wishlist.push(id);
  }
  localStorage.setItem('tixto_wishlist', JSON.stringify(wishlist));
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlist.length;
    wishlistCountEl.dataset.count = wishlist.length;
  }
  
  document.querySelectorAll(`.wishlist-btn[data-id="${id}"]`).forEach(btn => {
    btn.classList.toggle('active');
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', btn.classList.contains('active') ? 'currentColor' : 'none');
  });
}

// ===== Hero Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('hero-dots');

function initSlider() {
  if (!slides.length || !dotsContainer) return;
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
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dotsContainer && dotsContainer.children[currentSlide]) {
    dotsContainer.children[currentSlide].classList.remove('active');
  }
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  if (dotsContainer && dotsContainer.children[currentSlide]) {
    dotsContainer.children[currentSlide].classList.add('active');
  }
}

function nextSlide() {
  if (slides.length) goToSlide((currentSlide + 1) % slides.length);
}

// ===== Countdown Timer =====
function startCountdown() {
  let totalSeconds = 4 * 3600 + 32 * 60 + 18;
  
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!hoursEl) return;
  
  function tick() {
    if (totalSeconds <= 0) totalSeconds = 5 * 3600;
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
  if (e.target.classList.contains('add-cart-btn')) {
    const id = parseInt(e.target.dataset.id);
    addToCart(id);
  }
  
  if (e.target.closest('.wishlist-btn')) {
    const btn = e.target.closest('.wishlist-btn');
    const id = parseInt(btn.dataset.id);
    toggleWishlist(id);
  }
  
  if (e.target.classList.contains('qty-btn')) {
    const id = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    updateQty(id, action === 'plus' ? 1 : -1);
  }
  if (e.target.classList.contains('remove-item')) {
    const id = parseInt(e.target.dataset.id);
    removeFromCart(id);
  }
  
  if (e.target.closest('.cart-btn')) {
    e.preventDefault();
    cartDrawer.classList.add('open');
    overlay.classList.add('show');
  }
  
  if (e.target.classList.contains('close-cart') || e.target.classList.contains('continue-shopping') || e.target === overlay) {
    cartDrawer.classList.remove('open');
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
  }
  
  if (e.target.closest('.mobile-menu-btn')) {
    mobileMenu.classList.add('open');
    overlay.classList.add('show');
  }
  if (e.target.classList.contains('close-menu')) {
    mobileMenu.classList.remove('open');
    overlay.classList.remove('show');
  }
  
  if (e.target.classList.contains('promo-close')) {
    const bar = document.querySelector('.promo-bar');
    if (bar) bar.style.display = 'none';
  }
  
  if (e.target.id === 'checkout-btn') {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert(`Thanks for shopping with Tixto Clothes!\n\nThis is a demo site.\nOrder total: $${cart.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2)}\n\nIn a real site this would go to payment.`);
  }
});

document.getElementById('newsletter-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input').value;
  alert(`Thanks for subscribing with ${email}!\nYou'll receive exclusive offers from Tixto Clothes.`);
  e.target.reset();
});

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
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlist.length;
    wishlistCountEl.dataset.count = wishlist.length;
  }
  initSlider();
  startCountdown();
});
