const API_URL = 'https://dummyjson.com/products?limit=130';

const featuredGrid = document.getElementById('featuredGrid');

const createProductCard = (product, index) => {
  const { id, title, price, thumbnail, rating, discountPercentage } = product;

  const card = document.createElement('div');

  card.className = `product-card bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden fade-up`;

  card.style.animationDelay = `${index * 0.07}s`;

  card.innerHTML = `
    <div class="relative overflow-hidden bg-purple-950 h-52">
      <img src="${thumbnail}" alt="${title}"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
        onerror="this.src='https://placehold.co/400x300/1c1917/f97316?text=Product'"/>
      ${discountPercentage > 5 ? `<span class="absolute top-3 left-3 bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded-lg">-${Math.round(discountPercentage)}%</span>` : ''}
    </div>

    <div class="p-4 bg-purple-700">
      <p class="text-stone-300 text-sm font-medium leading-snug mb-1 line-clamp-2">${title}</p>

      <div class="flex items-center gap-1 mb-3">
        ${renderStars(rating)}
        <span class="text-stone-900 text-xs">${rating.toFixed(1)}</span>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-white font-bold text-lg">$${price.toFixed(2)}</span>
        <button data-id="${id}" class="add-to-cart-btn bg-purple-950 hover:bg-purple-800 text-white text-xs font-semibold px-3 py-2 rounded-xl transition-all">
          Add to Cart
        </button>
      </div>

    </div>`;

  card.querySelector('.add-to-cart-btn').addEventListener('click', () => {
    addToCart({ id, title, price, thumbnail, rating });
    showHomeToast(`"${title.slice(0,30)}…" added to cart!`);
  });

  return card;
};


const showHomeToast = (msg) => {
  const t = document.createElement('div');
  t.className = 'fixed top-20 right-4 z-[100] bg-stone-800 border border-orange-500/40 text-white text-sm px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all';
  t.innerHTML = `<span class="text-orange-500">✓</span><span>${msg}</span>`;
  document.body.appendChild(t);
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateX(20px)'; t.style.transition = 'all .3s'; }, 2200);
  setTimeout(() => t.remove(), 2600);
};


(async function (){
  try 
  {
    const res  = await fetch(API_URL);

    const data = await res.json();
    let products = data.products;

    products = products.filter(p => {
       return p.category == 'beauty' || p.category == 'skin-care' || p.category == 'fragrances';
    });

    products.sort((a,b) => a.price - b.price);
  
    featuredGrid.innerHTML = '';
    products.slice(0, 4).forEach((p, i) => {
      featuredGrid.appendChild(createProductCard(p, i));
    });
  } 
  catch(err) 
  {
    featuredGrid.innerHTML = `<div class="col-span-4 text-center py-12 text-stone-400 text-sm">Failed to load products. <a href="products.html" class="text-orange-400 underline">Browse all</a></div>`;
  }
}());
