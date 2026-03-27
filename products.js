const API_URL = 'https://dummyjson.com/products?limit=130';

let allProducts  = [];
let filteredData = [];
let activeCategory = 'all';

const grid         = document.getElementById('productsGrid');
const loading      = document.getElementById('loadingState');
const errorState   = document.getElementById('errorState');
const emptySearch  = document.getElementById('emptySearch');
const searchInput  = document.getElementById('searchInput');
const sortSelect   = document.getElementById('sortSelect');
const catFilters   = document.getElementById('categoryFilters');
const productCount = document.getElementById('productCount');
const toast        = document.getElementById('toast');
const toastMsg     = document.getElementById('toastMsg');
const retryBtn     = document.getElementById('retryBtn');


let toastTimer;
const showToast = (msg) => {
  toastMsg.textContent = msg;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.add('hidden'), 2500);
};


const createCard = (product, index) => {
  const { id, title, price, thumbnail, rating, discountPercentage} = product;

  const card = document.createElement('div');

  card.className = 'product-card bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden fade-up';

  card.style.animationDelay = `${Math.min(index, 12) * 0.05}s`;

  card.innerHTML = `
    <div class="relative overflow-hidden bg-purple-950 h-52 group">
      <img src="${thumbnail}" alt="${title}"
        class="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
        loading="lazy"
        onerror="this.src='https://placehold.co/400x300/1c1917/f97316?text=Product'"/>

      ${discountPercentage > 5 ? `<span class="absolute top-3 left-3 bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded-lg">-${Math.round(discountPercentage)}%</span>` : ''}
    </div>

    <div class="p-4 bg-purple-700">
      <p class="text-stone-300 text-sm font-medium leading-snug mb-1 line-clamp-2 min-h-2.5">${title}</p>

      <div class="flex items-center gap-1 mb-3">
        ${renderStars(rating)}
        <span class="text-stone-900 text-xs">${rating.toFixed(1)}</span>
      </div>

      <div class="flex items-center justify-between gap-2">
        <div>
          <span class="text-white font-bold text-lg">$${price.toFixed(2)}</span>
          ${discountPercentage > 5
            ? `<span class="text-stone-900 text-xs line-through ml-1">$${(price / (1 - discountPercentage/100)).toFixed(2)}</span>`
            : ''}
        </div>

        <button data-id="${id}" class="add-btn bg-purple-950 hover:bg-purple-800 text-white text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap">
          Add to Cart
        </button>
      </div>

    </div>`;

  card.querySelector('.add-btn').addEventListener('click', () => {
    addToCart({ id, title, price, thumbnail, rating });
    showToast(`"${title.slice(0,30)}…" added to cart!`);
  });

  return card;
};


const renderGrid = (products) => {
  grid.innerHTML = '';

  if (products.length === 0) {
    grid.classList.add('hidden');
    emptySearch.classList.remove('hidden');
    productCount.textContent = 0;
    return;
  }

  emptySearch.classList.add('hidden');
  grid.classList.remove('hidden');
  productCount.textContent = products.length;

  products.forEach((p, i) => grid.appendChild(createCard(p, i)));
};


const applyFiltersAndSort = () => {
  const query = searchInput.value.trim().toLowerCase();
  const sort  = sortSelect.value;

  let result = allProducts.filter(p => {
    const matchCat = (activeCategory === 'all' || p.category === activeCategory);
    const matchSearch = (p.title.toLowerCase().includes(query) || p.description?.toLowerCase().includes(query));
    
    return matchCat && matchSearch;
  });

  switch (sort) {
    case 'price-asc':  result.sort((a,b) => a.price - b.price); break;
    case 'price-desc': result.sort((a,b) => b.price - a.price); break;
    case 'name-asc':   result.sort((a,b) => a.title.localeCompare(b.title)); break;
    case 'rating':     result.sort((a,b) => b.rating - a.rating); break;
  }

  filteredData = result;
  renderGrid(filteredData);
};


const buildCategoryFilters = (products) => {
  const cats = [...new Set(products.map(p => p.category))].sort();

  cats.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn text-sm px-4 py-1.5 rounded-full border hover:bg-purple-800 transition-all';
    btn.dataset.cat = cat;
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    catFilters.appendChild(btn);
  });

  catFilters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    applyFiltersAndSort();
  });
};


const loadProducts = async () => {
  loading.classList.remove('hidden');
  errorState.classList.add('hidden');
  grid.classList.add('hidden');

  try 
  {
    const res = await fetch(API_URL);

    const data = await res.json();
    allProducts = data.products;

    allProducts = allProducts.filter(p => {
       return p.category == 'beauty' || p.category == 'skin-care' || p.category == 'fragrances';
    });

    loading.classList.add('hidden');
    buildCategoryFilters(allProducts);

    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('cat');
    if (catParam) {
      const btn = document.querySelector(`[data-cat="${catParam}"]`);
      if (btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeCategory = catParam;
      }
    }

    applyFiltersAndSort();
  } 
  catch (err) 
  {
    loading.classList.add('hidden');
    errorState.classList.remove('hidden');
  }
};

searchInput.addEventListener('input', applyFiltersAndSort);
sortSelect.addEventListener('change', applyFiltersAndSort);
retryBtn?.addEventListener('click', loadProducts);

loadProducts();