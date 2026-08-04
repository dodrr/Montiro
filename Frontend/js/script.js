/* ============================================================
   MONTIRO — Premium Watch Replicas Store
   script.js — подключён к backend API
   ============================================================ */

(() => {
  'use strict';

  const API_URL = 'https://montiro.onrender.com';
  const WHATSAPP_NUMBER = '77059126313'; // без + и без пробелов

  /* ── DEFAULT PRODUCTS (fallback если backend недоступен) ── */
  const DEFAULT_PRODUCTS = [
    {
      id: 1, brand: 'Rolex', name: 'Submariner Date', category: 'Luxury',
      rating: 4.9, color: '#C9A84C', price: null, image: null, images: [],
      in_stock: true, stock_left: 3,
      description: 'Точная реплика легендарного дайвера Rolex. Керамический безель, автоматический механизм, сапфировое стекло.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь 316L', 'Стекло': 'Сапфир', 'Водозащита': '100 м (имитация)' }
    },
    {
      id: 2, brand: 'Hublot', name: 'Big Bang Unico', category: 'Luxury',
      rating: 4.8, color: '#5AA9E6', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Массивный спортивный хронограф с многослойным циферблатом и силиконовым ремешком.',
      specs: { 'Механизм': 'Кварцевый хронограф', 'Корпус': 'Сталь PVD', 'Стекло': 'Минеральное', 'Водозащита': '50 м (имитация)' }
    },
    {
      id: 3, brand: 'Tissot', name: 'PRX Powermatic', category: 'Classic',
      rating: 4.6, color: '#E0DCD4', price: null, image: null, images: [],
      in_stock: false, stock_left: 0,
      description: 'Стильная классика в духе 1970-х с интегрированным браслетом и тонким корпусом.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь', 'Стекло': 'Сапфир', 'Водозащита': '30 м (имитация)' }
    },
    {
      id: 4, brand: 'Apple', name: 'Watch Ultra Style', category: 'Smart',
      rating: 4.4, color: '#7CE0C7', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Умные часы в премиальном корпусе с ярким AMOLED-экраном и спортивным ремешком.',
      specs: { 'Дисплей': 'AMOLED 1.9"', 'Корпус': 'Алюминий/титан', 'Связь': 'Bluetooth 5.0', 'Водозащита': '50 м (имитация)' }
    },
    {
      id: 5, brand: 'Patek Philippe', name: 'Nautilus 5711', category: 'Luxury',
      rating: 5.0, color: '#F4D58D', price: null, image: null, images: [],
      in_stock: true, stock_left: 1,
      description: 'Икона часового мира — реплика культовой модели с гильошированным циферблатом.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь', 'Стекло': 'Сапфир', 'Водозащита': '30 м (имитация)' }
    },
    {
      id: 6, brand: 'Omega', name: 'Seamaster Diver 300M', category: 'Sport',
      rating: 4.8, color: '#3E6FA8', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Дайверские часы со светящимися метками и керамическим безелем — точь-в-точь как оригинал.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь', 'Стекло': 'Сапфир', 'Водозащита': '100 м (имитация)' }
    },
    {
      id: 7, brand: 'Tissot', name: 'Le Locle Automatic', category: 'Classic',
      rating: 4.5, color: '#B7A78E', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Элегантная модель для офиса с гильошированным циферблатом и римскими цифрами.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь', 'Стекло': 'Минеральное', 'Водозащита': '30 м (имитация)' }
    },
    {
      id: 8, brand: 'Hublot', name: 'Classic Fusion', category: 'Luxury',
      rating: 4.7, color: '#D9B45A', price: null, image: null, images: [],
      in_stock: false, stock_left: 0,
      description: 'Минималистичный хронограф с многослойным циферблатом и кожаным ремешком.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь PVD', 'Стекло': 'Сапфир', 'Водозащита': '50 м (имитация)' }
    },
    {
      id: 9, brand: 'Rolex', name: 'GMT-Master II', category: 'Sport',
      rating: 4.9, color: '#C0C5CC', price: null, image: null, images: [],
      in_stock: true, stock_left: 2,
      description: 'Культовая «Pepsi» модель с двухцветным безелем и браслетом Jubilee.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь', 'Стекло': 'Сапфир', 'Водозащита': '100 м (имитация)' }
    },
    {
      id: 10, brand: 'Omega', name: 'Constellation', category: 'Classic',
      rating: 4.6, color: '#E8C9D0', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Изящная модель с фирменными «коготками» на корпусе и перламутровым циферблатом.',
      specs: { 'Механизм': 'Кварцевый', 'Корпус': 'Сталь/золото', 'Стекло': 'Сапфир', 'Водозащита': '30 м (имитация)' }
    },
    {
      id: 11, brand: 'Hublot', name: 'Spirit of Big Bang', category: 'Sport',
      rating: 4.5, color: '#E37B5D', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Яркая спортивная модель с тонопластовым корпусом и резиновым ремешком.',
      specs: { 'Механизм': 'Кварцевый', 'Корпус': 'Полимер/сталь', 'Стекло': 'Минеральное', 'Водозащита': '50 м (имитация)' }
    },
    {
      id: 12, brand: 'Patek Philippe', name: 'Aquanaut', category: 'Sport',
      rating: 4.7, color: '#6FA88A', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Спортивно-элегантная модель с тропическим каучуковым ремешком.',
      specs: { 'Механизм': 'Автоматический', 'Корпус': 'Сталь', 'Стекло': 'Сапфир', 'Водозащита': '40 м (имитация)' }
    },
    {
      id: 13, brand: 'Tissot', name: 'T-Touch Connect', category: 'Smart',
      rating: 4.3, color: '#A89AD0', price: null, image: null, images: [],
      in_stock: true, stock_left: null,
      description: 'Гибрид классики и смарт-функций — сенсорный циферблат и аналоговые стрелки.',
      specs: { 'Дисплей': 'Сенсорный аналог', 'Корпус': 'Титан', 'Связь': 'Bluetooth 4.0', 'Водозащита': '50 м (имитация)' }
    }
  ];

  /* ── PRODUCTS & BRANDS (заполняются через API) ─────────── */
  let PRODUCTS = [];
  let BRANDS   = [];

  /* ── STATE ─────────────────────────────────────────────── */
  const state = {
    filters: { category: '', brand: '', sort: 'default', search: '', maxPrice: null },
    cart: {},
    favorites: new Set(),
    modalProductId: null
  };

  /* ── HELPERS ───────────────────────────────────────────── */
  const $ = (sel) => document.querySelector(sel);
  const getProduct = (id) => PRODUCTS.find(p => p.id === id);

  /* Нормализуем товар с бэка — добавляем дефолты для отсутствующих полей */
  function normalizeProduct(p) {
    const normalized = {
      color:       '#C9A84C',
      image:       null,
      images:      [],
      video:       null,
      description: '',
      specs:       {},
      rating:      0,
      price:       null,
      in_stock:    true,
      stock_left:  null,
      ...p,
      /* specs может прийти как null из БД */
      specs: p.specs && typeof p.specs === 'object' ? p.specs : {},
    };
    /* images может прийти как null или не массив */
    if (!Array.isArray(normalized.images)) normalized.images = [];
    return normalized;
  }

  function formatPrice(p) {
    if (p.price === null || p.price === undefined || p.price === '' || p.price === 0) return '???';
    const num = Number(p.price);
    if (Number.isNaN(num) || num === 0) return '???';
    return num.toLocaleString('ru-RU') + ' ₸';
  }

  function renderStars(rating) {
    const full = Math.round(rating || 0);
    let out = '';
    for (let i = 0; i < 5; i++) {
      out += `<span class="star">${i < full ? '★' : '☆'}</span>`;
    }
    return `${out} <span>${(rating || 0).toFixed(1)}</span>`;
  }

  /* Собирает список всех визуальных источников товара: главное фото + доп. фото */
  function getProductImageList(p) {
    const list = [];
    if (p.image) list.push(p.image);
    if (Array.isArray(p.images)) p.images.forEach(img => { if (img && !list.includes(img)) list.push(img); });
    return list;
  }

  function getProductVisual(p, size = 100, sourceOverride = null) {
    const src = sourceOverride !== undefined && sourceOverride !== null ? sourceOverride : p.image;
    if (src) {
      return `<img src="${src}" alt="${p.brand} ${p.name}" style="width:${size}%;height:${size}%;object-fit:cover;border-radius:inherit;">`;
    }
    return watchSVG(p.color || '#C9A84C', size);
  }

  function watchSVG(color, size = 100) {
    const c = color || '#C9A84C';
    return `
      <svg class="watch-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="${size}%" height="${size}%">
        <circle cx="100" cy="100" r="86" fill="none" stroke="${c}" stroke-width="6" opacity="0.35"/>
        <circle cx="100" cy="100" r="70" fill="#161616" stroke="${c}" stroke-width="3"/>
        <circle cx="100" cy="100" r="4" fill="${c}"/>
        <line x1="100" y1="100" x2="100" y2="55" stroke="#FAFAFA" stroke-width="4" stroke-linecap="round"/>
        <line x1="100" y1="100" x2="135" y2="118" stroke="#FAFAFA" stroke-width="3" stroke-linecap="round"/>
        <line x1="100" y1="100" x2="100" y2="48" stroke="${c}" stroke-width="2" stroke-linecap="round"/>
        ${[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
          const r1 = 70, r2 = 62;
          const rad = (a - 90) * Math.PI / 180;
          const x1 = 100 + r1 * Math.cos(rad), y1 = 100 + r1 * Math.sin(rad);
          const x2 = 100 + r2 * Math.cos(rad), y2 = 100 + r2 * Math.sin(rad);
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${c}" stroke-width="2" opacity="0.6"/>`;
        }).join('')}
        <rect x="92" y="14" width="16" height="20" rx="3" fill="#2A2A2A" stroke="${c}" stroke-width="2"/>
        <rect x="92" y="166" width="16" height="20" rx="3" fill="#2A2A2A" stroke="${c}" stroke-width="2"/>
      </svg>`;
  }

  /* ── NOTIFICATIONS ─────────────────────────────────────── */
  function notify(message) {
    const root = $('#notifications');
    const el = document.createElement('div');
    el.className = 'notification';
    el.textContent = message;
    root.appendChild(el);
    setTimeout(() => {
      el.classList.add('out');
      setTimeout(() => el.remove(), 300);
    }, 2600);
  }

  /* ── PRELOADER ─────────────────────────────────────────── */
  function hidePreloader() {
    const pre = $('#preloader');
    if (pre) pre.classList.add('hidden');
  }

  function initPreloader() {
    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 600);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, 600));
      setTimeout(hidePreloader, 2500);
    }
  }

  /* ── HEADER SCROLL ─────────────────────────────────────── */
  function initHeaderScroll() {
    const header = $('#header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  /* ── MOBILE NAV ────────────────────────────────────────── */
  function initMobileNav() {
    const burger  = $('#burgerBtn');
    const nav     = $('#mobileNav');
    const overlay = $('#overlay');

    function close() {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      nav.classList.remove('open');
      nav.setAttribute('aria-hidden', 'true');
      overlay.classList.remove('visible');
      document.body.classList.remove('no-scroll');
    }
    function open() {
      burger.classList.add('open');
      burger.setAttribute('aria-expanded', 'true');
      nav.classList.add('open');
      nav.setAttribute('aria-hidden', 'false');
      overlay.classList.add('visible');
      document.body.classList.add('no-scroll');
    }

    burger.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
    overlay.addEventListener('click', () => { close(); closeCart(); closeFavorites(); });
    document.querySelectorAll('.mobile-nav__link').forEach(l => l.addEventListener('click', close));
  }

  /* ── SEARCH BAR ────────────────────────────────────────── */
  function initSearch() {
    const toggleBtn = $('#searchToggleBtn');
    const bar       = $('#searchBar');
    const input     = $('#searchInput');
    const closeBtn  = $('#searchCloseBtn');

    toggleBtn.addEventListener('click', () => {
      if (bar.hasAttribute('hidden')) {
        bar.removeAttribute('hidden');
        setTimeout(() => input.focus(), 50);
      } else {
        bar.setAttribute('hidden', '');
      }
    });
    closeBtn.addEventListener('click', () => {
      bar.setAttribute('hidden', '');
      input.value = '';
      state.filters.search = '';
      renderCatalog();
    });
    input.addEventListener('input', (e) => {
      state.filters.search = e.target.value.trim().toLowerCase();
      renderCatalog();
    });
  }

  /* ── FILTERS ───────────────────────────────────────────── */
  function initFilters() {
    /* бренды заполняются в populateBrandFilter() после загрузки товаров */
    $('#filterCategory').addEventListener('change', (e) => {
      state.filters.category = e.target.value;
      renderCatalog();
    });
    $('#filterBrand').addEventListener('change', (e) => {
      state.filters.brand = e.target.value;
      renderCatalog();
    });
    $('#filterSort').addEventListener('change', (e) => {
      state.filters.sort = e.target.value;
      renderCatalog();
    });
    $('#filterMaxPrice').addEventListener('input', (e) => {
      const val = e.target.value.trim();
      /* пусто = без ограничения по цене */
      state.filters.maxPrice = val === '' ? null : Number(val);
      renderCatalog();
    });

    const resetAll = () => {
      state.filters = { category: '', brand: '', sort: 'default', search: '', maxPrice: null };
      $('#filterCategory').value = '';
      $('#filterBrand').value    = '';
      $('#filterSort').value     = 'default';
      $('#searchInput').value    = '';
      $('#filterMaxPrice').value = '';
      renderCatalog();
    };
    $('#resetFilters').addEventListener('click', resetAll);
    $('#resetFromEmpty').addEventListener('click', resetAll);
  }

  function populateBrandFilter() {
    const brandSelect = $('#filterBrand');
    brandSelect.innerHTML = '<option value="">Все бренды</option>';
    BRANDS.forEach(brand => {
      const opt = document.createElement('option');
      opt.value = brand;
      opt.textContent = brand;
      brandSelect.appendChild(opt);
    });
  }

  function getFilteredProducts() {
    let list = PRODUCTS.filter(p => {
      if (state.filters.category && p.category !== state.filters.category) return false;
      if (state.filters.brand && p.brand !== state.filters.brand) return false;
      if (state.filters.search) {
        const q = state.filters.search;
        if (!`${p.brand} ${p.name} ${p.category}`.toLowerCase().includes(q)) return false;
      }
      /* Фильтр по цене — товары без цены (???) всегда показываем, раз их не с чем сравнивать */
      if (state.filters.maxPrice !== null && state.filters.maxPrice !== undefined && !Number.isNaN(state.filters.maxPrice) && p.price) {
        if (Number(p.price) > state.filters.maxPrice) return false;
      }
      return true;
    });

    switch (state.filters.sort) {
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'name':   list.sort((a, b) => a.name.localeCompare(b.name, 'ru')); break;
    }
    return list;
  }

  /* ── CATALOG RENDER ────────────────────────────────────── */
  function renderCatalog() {
    const grid  = $('#catalogGrid');
    const empty = $('#catalogEmpty');
    const list  = getFilteredProducts();

    $('#resultsCount').textContent = list.length;

    if (!list.length) {
      grid.innerHTML = '';
      empty.removeAttribute('hidden');
      return;
    }
    empty.setAttribute('hidden', '');

    grid.innerHTML = list.map(p => {
      const isFav = state.favorites.has(p.id);

      /* Краткие характеристики для карточки — берём из новых полей или из specs */
      const chips = [];
      if (p.mechanism)        chips.push(p.mechanism);
      if (p.case_material)    chips.push(p.case_material);
      if (p.strap_material)   chips.push(p.strap_material);
      /* fallback: если полей нет — берём первые 3 из specs */
      if (!chips.length && p.specs) {
        Object.values(p.specs).slice(0, 3).forEach(v => chips.push(v));
      }

      const chipsHtml = chips.length
        ? `<div class="product-card__chips">${chips.slice(0, 4).map(c =>
            `<span class="product-card__chip">${c}</span>`).join('')}</div>`
        : '';

      /* Бейдж наличия */
      const inStock = p.in_stock !== false;
      const stockBadge = inStock
        ? `<span class="product-card__stock product-card__stock--in">В наличии</span>`
        : `<span class="product-card__stock product-card__stock--out">Под заказ</span>`;

      /* "Осталось всего N шт." — показываем только если мало и товар в наличии */
      const stockLeftHtml = (inStock && Number.isFinite(p.stock_left) && p.stock_left > 0 && p.stock_left <= 5)
        ? `<div class="product-card__stock-left">Осталось ${p.stock_left} шт.</div>`
        : '';

      return `
      <article class="product-card" data-id="${p.id}" tabindex="0" role="button" aria-label="${p.brand} ${p.name}">
        <div class="product-card__image-wrap">
          <div class="product-card__image-bg">${getProductVisual(p)}</div>
          <span class="product-card__category">${p.category}</span>
          ${stockBadge}
          <button class="product-card__fav ${isFav ? 'active' : ''}" data-fav-id="${p.id}" aria-label="В избранное">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <button class="product-card__quickview" data-quickview-id="${p.id}">Быстрый просмотр</button>
        </div>
        <div class="product-card__body">
          <p class="product-card__brand">${p.brand}</p>
          <h3 class="product-card__name">${p.name}</h3>
          ${chipsHtml}
          ${stockLeftHtml}
          <div class="product-card__footer">
            <span class="product-card__price">${formatPrice(p)}</span>
            <span class="product-card__rating">${renderStars(p.rating)}</span>
          </div>
        </div>
      </article>`;
    }).join('');
  }

  function initCatalogEvents() {
    const grid = $('#catalogGrid');
    grid.addEventListener('click', (e) => {
      const favBtn = e.target.closest('[data-fav-id]');
      if (favBtn) { e.stopPropagation(); toggleFavorite(Number(favBtn.dataset.favId)); return; }
      const quickBtn = e.target.closest('[data-quickview-id]');
      if (quickBtn) { e.stopPropagation(); openModal(Number(quickBtn.dataset.quickviewId)); return; }
      const card = e.target.closest('.product-card');
      if (card) openModal(Number(card.dataset.id));
    });
    grid.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.product-card');
        if (card) { e.preventDefault(); openModal(Number(card.dataset.id)); }
      }
    });
  }

  /* ── BRANDS MARQUEE ────────────────────────────────────── */
  function renderBrands() {
    const track = $('#brandsTrack');
    const all   = [...BRANDS, ...BRANDS];
    track.innerHTML = all.map(b => `<span class="brands__item">${b}</span>`).join('');
  }

  /* ── FAVORITES ─────────────────────────────────────────── */
  function toggleFavorite(id) {
    const product = getProduct(id);
    if (!product) return;
    if (state.favorites.has(id)) {
      state.favorites.delete(id);
      notify(`${product.brand} ${product.name} удалено из избранного`);
    } else {
      state.favorites.add(id);
      notify(`${product.brand} ${product.name} добавлено в избранное`);
    }
    updateFavoritesBadge();
    renderCatalog();
    renderFavorites();
    if (state.modalProductId === id) updateModalFavButton();
  }

  function updateFavoritesBadge() {
    const badge = $('#favoritesBadge');
    const count = state.favorites.size;
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  function renderFavorites() {
    const body = $('#favoritesBody');
    if (!state.favorites.size) {
      body.innerHTML = `<div class="cart-empty"><div class="cart-empty__icon">♡</div><p>Список избранного пуст</p></div>`;
      return;
    }
    body.innerHTML = [...state.favorites].map(id => {
      const p = getProduct(id);
      if (!p) return '';
      return `
      <div class="fav-item" data-id="${p.id}">
        <div class="fav-item__image">${getProductVisual(p, 80)}</div>
        <div class="fav-item__info">
          <p class="fav-item__brand">${p.brand}</p>
          <p class="fav-item__name">${p.name}</p>
          <p class="fav-item__price">${formatPrice(p)}</p>
        </div>
        <button class="fav-item__remove" data-remove-fav="${p.id}" aria-label="Удалить из избранного">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>`;
    }).join('');
  }

  function initFavoritesEvents() {
    const body = $('#favoritesBody');
    body.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('[data-remove-fav]');
      if (removeBtn) { e.stopPropagation(); toggleFavorite(Number(removeBtn.dataset.removeFav)); return; }
      const item = e.target.closest('.fav-item');
      if (item) { closeFavorites(); openModal(Number(item.dataset.id)); }
    });
  }

  function openFavorites() {
    closeCart();
    $('#favoritesDrawer').classList.add('open');
    $('#favoritesDrawer').setAttribute('aria-hidden', 'false');
    $('#overlay').classList.add('visible');
    document.body.classList.add('no-scroll');
  }
  function closeFavorites() {
    $('#favoritesDrawer').classList.remove('open');
    $('#favoritesDrawer').setAttribute('aria-hidden', 'true');
    if (!$('#cartDrawer').classList.contains('open') && !$('#mobileNav').classList.contains('open')) {
      $('#overlay').classList.remove('visible');
      document.body.classList.remove('no-scroll');
    }
  }

  function initFavoritesDrawer() {
    $('#favoritesBtn').addEventListener('click', openFavorites);
    $('#favoritesClose').addEventListener('click', closeFavorites);
  }

  /* ── CART ──────────────────────────────────────────────── */
  function addToCart(id, qty = 1) {
    state.cart[id] = (state.cart[id] || 0) + qty;
    updateCartBadge();
    renderCart();
    const p = getProduct(id);
    if (p) notify(`${p.brand} ${p.name} добавлено в подборку`);
  }

  function setCartQty(id, qty) {
    if (qty <= 0) delete state.cart[id];
    else state.cart[id] = qty;
    updateCartBadge();
    renderCart();
  }

  function removeFromCart(id) {
    delete state.cart[id];
    updateCartBadge();
    renderCart();
  }

  function getCartCount() {
    return Object.values(state.cart).reduce((a, b) => a + b, 0);
  }

  function updateCartBadge() {
    const badge = $('#cartBadge');
    const count = getCartCount();
    badge.textContent = count;
    badge.hidden = count === 0;
  }

  function renderCart() {
    const body   = $('#cartBody');
    const footer = $('#cartFooter');
    const entries = Object.entries(state.cart);

    if (!entries.length) {
      body.innerHTML = `<div class="cart-empty"><div class="cart-empty__icon">⛒</div><p>Подборка пуста</p></div>`;
      footer.hidden = true;
      return;
    }

    footer.hidden = false;
    body.innerHTML = entries.map(([id, qty]) => {
      const p = getProduct(Number(id));
      if (!p) return '';
      return `
      <div class="cart-item" data-id="${p.id}">
        <div class="cart-item__image">${getProductVisual(p, 70)}</div>
        <div class="cart-item__info">
          <p class="cart-item__brand">${p.brand}</p>
          <p class="cart-item__name">${p.name}</p>
          <div class="cart-item__footer">
            <span class="cart-item__price">${formatPrice(p)}</span>
            <div class="cart-item__controls">
              <button class="cart-item__qty-btn" data-qty-minus="${p.id}" aria-label="Уменьшить">−</button>
              <span class="cart-item__qty-val">${qty}</span>
              <button class="cart-item__qty-btn" data-qty-plus="${p.id}" aria-label="Увеличить">+</button>
              <button class="cart-item__remove" data-remove-cart="${p.id}" aria-label="Удалить">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>`;
    }).join('');
  }

  function initCartEvents() {
    const body = $('#cartBody');
    body.addEventListener('click', (e) => {
      const minus  = e.target.closest('[data-qty-minus]');
      const plus   = e.target.closest('[data-qty-plus]');
      const remove = e.target.closest('[data-remove-cart]');
      if (minus)  setCartQty(Number(minus.dataset.qtyMinus),  (state.cart[minus.dataset.qtyMinus]  || 0) - 1);
      else if (plus)   setCartQty(Number(plus.dataset.qtyPlus),   (state.cart[plus.dataset.qtyPlus]   || 0) + 1);
      else if (remove) removeFromCart(Number(remove.dataset.removeCart));
    });

    $('.cart-drawer__checkout').addEventListener('click', () => {
      if (!getCartCount()) return;
      const lines = Object.entries(state.cart).map(([id, qty]) => {
        const p = getProduct(Number(id));
        if (!p) return '';
        const qtyStr   = qty > 1 ? ` x${qty}` : '';
        const priceStr = p.price ? ` — ${formatPrice(p)}` : '';
        return `• ${p.brand} ${p.name}${qtyStr}${priceStr}`;
      }).filter(Boolean);
      const text = `Здравствуйте! Хочу купить:\n\n${lines.join('\n')}\n\nПодскажите детали и как оплатить?`;
      askTelegramConfirm(text);
    });
  }

  function openCart() {
    closeFavorites();
    $('#cartDrawer').classList.add('open');
    $('#cartDrawer').setAttribute('aria-hidden', 'false');
    $('#overlay').classList.add('visible');
    document.body.classList.add('no-scroll');
  }
  function closeCart() {
    $('#cartDrawer').classList.remove('open');
    $('#cartDrawer').setAttribute('aria-hidden', 'true');
    if (!$('#favoritesDrawer').classList.contains('open') && !$('#mobileNav').classList.contains('open')) {
      $('#overlay').classList.remove('visible');
      document.body.classList.remove('no-scroll');
    }
  }

  function initCartDrawer() {
    $('#cartBtn').addEventListener('click', openCart);
    $('#cartClose').addEventListener('click', closeCart);
  }

  /* ── ORDERS — отправка на backend API ──────────────────── */
  async function saveOrder(product) {
    try {
      await fetch(`${API_URL}/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          watch:    `${product.brand} ${product.name}`,
          customer: 'Покупатель',
          price:    product.price || 0
        })
      });
    } catch (e) {
      console.error('Ошибка создания заказа:', e);
    }
  }

  /* ── PRODUCT MODAL ─────────────────────────────────────── */
  let modalQty = 1;
  let modalImageList = [];
  let modalActiveImageIndex = 0;

  function openModal(id) {
    const p = getProduct(id);
    if (!p) return;
    state.modalProductId = id;
    modalQty = 1;

    /* Галерея: собираем список фото (главное + доп.) */
    modalImageList = getProductImageList(p);
    modalActiveImageIndex = 0;

    renderModalMainImage(p);
    renderModalThumbs(p);

    $('#modalCategory').textContent   = p.category;
    $('#modalBrand').textContent      = p.brand;
    $('#modalProductName').textContent = p.name;
    $('#modalRating').innerHTML       = renderStars(p.rating);
    $('#modalPrice').textContent      = formatPrice(p);
    $('#modalQtyVal').textContent      = modalQty;
    $('#modalDescription').textContent = p.description || '';

    /* Бейдж наличия */
    const inStock = p.in_stock !== false;
    const stockBadgeEl = $('#modalStockBadge');
    stockBadgeEl.textContent = inStock ? 'В наличии' : 'Под заказ';
    stockBadgeEl.className = `modal__badge-stock ${inStock ? 'modal__badge-stock--in' : 'modal__badge-stock--out'}`;

    /* Осталось всего N шт. */
    const stockLeftEl = $('#modalStockLeft');
    if (inStock && Number.isFinite(p.stock_left) && p.stock_left > 0 && p.stock_left <= 5) {
      stockLeftEl.textContent = `Осталось всего ${p.stock_left} шт.`;
      stockLeftEl.hidden = false;
    } else {
      stockLeftEl.hidden = true;
    }

    /* Характеристики — собираем из новых полей, fallback на specs */
    const specsMap = {};
    if (p.collection)       specsMap['Коллекция']         = p.collection;
    if (p.mechanism)        specsMap['Механизм']           = p.mechanism;
    if (p.case_material)    specsMap['Материал корпуса']   = p.case_material;
    if (p.strap_material)   specsMap['Материал ремешка']   = p.strap_material;

    /* если новых полей нет — берём из specs (дефолтные товары) */
    const finalSpecs = Object.keys(specsMap).length
      ? specsMap
      : (p.specs && typeof p.specs === 'object' ? p.specs : {});

    $('#modalSpecs').innerHTML = Object.entries(finalSpecs).map(([k, v]) =>
      `<div><dt>${k}</dt><dd>${v}</dd></div>`
    ).join('');

    updateModalFavButton();
    $('#productModal').removeAttribute('hidden');
    document.body.classList.add('no-scroll');
  }

  /* Отрисовать главное изображение/видео в модалке */
  function renderModalMainImage(p) {
    const imageBg = $('#modalImageBg');
    if (p.video) {
      imageBg.innerHTML = `<video src="${p.video}" autoplay muted loop playsinline style="width:100%;border-radius:8px;"></video>`;
      return;
    }
    const src = modalImageList[modalActiveImageIndex] || null;
    imageBg.innerHTML = getProductVisual(p, 100, src);
  }

  /* Отрисовать полоску миниатюр под фото */
  function renderModalThumbs(p) {
    const thumbsEl = $('#modalThumbs');
    /* Если фото меньше двух и нет видео — миниатюры не нужны */
    if (modalImageList.length < 2 && !p.video) {
      thumbsEl.innerHTML = '';
      return;
    }
    thumbsEl.innerHTML = modalImageList.map((src, i) => `
      <button class="modal__thumb ${i === modalActiveImageIndex ? 'active' : ''}" data-thumb-index="${i}">
        ${getProductVisual(p, 100, src)}
      </button>`).join('');
  }

  function updateModalFavButton() {
    const btn = $('#modalFavBtn');
    const isFav = state.favorites.has(state.modalProductId);
    btn.classList.toggle('active', isFav);
  }

  function closeModal() {
    $('#productModal').setAttribute('hidden', '');
    state.modalProductId = null;
    if (!$('#cartDrawer').classList.contains('open') &&
        !$('#favoritesDrawer').classList.contains('open') &&
        !$('#mobileNav').classList.contains('open')) {
      document.body.classList.remove('no-scroll');
    }
  }

  function initModal() {
    $('#modalClose').addEventListener('click', closeModal);
    $('#modalBackdrop').addEventListener('click', closeModal);

    /* Переключение фото по клику на миниатюру */
    $('#modalThumbs').addEventListener('click', (e) => {
      const thumb = e.target.closest('[data-thumb-index]');
      if (!thumb) return;
      const p = getProduct(state.modalProductId);
      if (!p) return;
      modalActiveImageIndex = Number(thumb.dataset.thumbIndex);
      renderModalMainImage(p);
      renderModalThumbs(p);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (!$('#productModal').hasAttribute('hidden')) closeModal();
        closeCart();
        closeFavorites();
      }
    });

    $('#modalQtyMinus').addEventListener('click', () => {
      modalQty = Math.max(1, modalQty - 1);
      $('#modalQtyVal').textContent = modalQty;
    });
    $('#modalQtyPlus').addEventListener('click', () => {
      modalQty = Math.min(99, modalQty + 1);
      $('#modalQtyVal').textContent = modalQty;
    });

    $('#modalAddCart').addEventListener('click', () => {
      if (state.modalProductId == null) return;
      addToCart(state.modalProductId, modalQty);
    });

    $('#modalFavBtn').addEventListener('click', () => {
      if (state.modalProductId == null) return;
      toggleFavorite(state.modalProductId);
    });

    $('#modalBuyBtn').addEventListener('click', () => {
      if (state.modalProductId == null) return;
      const p = getProduct(state.modalProductId);
      if (!p) return;
      saveOrder(p);
      const priceText = p.price ? `Цена: ${formatPrice(p)}` : 'Уточнить цену';
      const text = `Здравствуйте! Хочу купить:\n\n${p.brand} ${p.name} (${p.category})\n${priceText}\n\nПодскажите детали и как оплатить?`;
      askTelegramConfirm(text);
    });
  }

  /* ── FAQ ACCORDION ─────────────────────────────────────── */
  function initFaq() {
    document.querySelectorAll('.faq__question').forEach(btn => {
      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        /* закрываем все */
        document.querySelectorAll('.faq__question').forEach(b => {
          b.setAttribute('aria-expanded', 'false');
          b.nextElementSibling.classList.remove('open');
        });
        /* открываем текущий если был закрыт */
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          btn.nextElementSibling.classList.add('open');
        }
      });
    });
  }

  /* ── HERO CLOCK ────────────────────────────────────────── */
  function initHeroClock() {
    const hour   = $('#watchHourHand');
    const minute = $('#watchMinuteHand');
    const second = $('#watchSecondHand');
    if (!hour || !minute || !second) return;

    function tick() {
      const now = new Date();
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds();
      hour.style.transform   = `translateX(-50%) rotate(${(h * 30) + (m / 60) * 30}deg)`;
      minute.style.transform = `translateX(-50%) rotate(${(m * 6) + (s / 60) * 6}deg)`;
      second.style.transform = `translateX(-50%) rotate(${s * 6}deg)`;
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ── CONTACT CONFIRM MODAL (Telegram / WhatsApp) ───────── */
  let pendingMessage = null;

  function askTelegramConfirm(text) {
    pendingMessage = text;
    $('#confirmModal').removeAttribute('hidden');
  }

  function closeTelegramConfirm() {
    $('#confirmModal').setAttribute('hidden', '');
    pendingMessage = null;
  }

  function initTelegramConfirm() {
    $('#confirmModalTelegram').addEventListener('click', () => {
      if (pendingMessage) {
        const url = `https://t.me/montiro_watches?text=${encodeURIComponent(pendingMessage)}`;
        window.open(url, '_blank', 'noopener');
      }
      closeTelegramConfirm();
    });
    $('#confirmModalWhatsapp').addEventListener('click', () => {
      if (pendingMessage) {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(pendingMessage)}`;
        window.open(url, '_blank', 'noopener');
      }
      closeTelegramConfirm();
    });
    $('#confirmModalCancel').addEventListener('click', closeTelegramConfirm);
    $('#confirmModalBackdrop').addEventListener('click', closeTelegramConfirm);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !$('#confirmModal').hasAttribute('hidden')) closeTelegramConfirm();
    });
  }

  /* ── LOAD PRODUCTS FROM API ────────────────────────────── */
  async function loadProductsFromAPI() {
    try {
      const res = await fetch(`${API_URL}/product`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length) {
        return data.map(normalizeProduct);
      }
      throw new Error('Пустой массив');
    } catch (e) {
      console.warn('API недоступен или вернул пустой список, используем дефолтные товары:', e.message);
      return DEFAULT_PRODUCTS;
    }
  }

  /* ── INIT APP ──────────────────────────────────────────── */
  async function initApp() {
    /* 1. Загружаем товары с API (или fallback на дефолтные) */
    PRODUCTS = await loadProductsFromAPI();
    BRANDS   = [...new Set(PRODUCTS.map(p => p.brand))];

    /* 2. Заполняем фильтр брендов */
    populateBrandFilter();

    /* 3. Рендерим каталог и вспомогательные блоки */
    renderBrands();
    renderCatalog();
    renderCart();
    renderFavorites();
    updateCartBadge();
    updateFavoritesBadge();
  }

  /* ── INIT ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initHeaderScroll();
    initMobileNav();
    initSearch();
    initFilters();
    initCatalogEvents();
    initFavoritesDrawer();
    initFavoritesEvents();
    initCartDrawer();
    initCartEvents();
    initModal();
    initTelegramConfirm();
    initHeroClock();
    initFaq();

    /* Загрузка товаров с бэкенда — запускается последней */
    initApp();
  });
})();