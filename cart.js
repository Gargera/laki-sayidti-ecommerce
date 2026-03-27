const emptyCart     = document.getElementById('emptyCart');
const cartContent   = document.getElementById('cartContent');
const cartItemsList = document.getElementById('cartItemsList');
const orderSummary = document.getElementById("orderSummary");
const totalItems    = document.getElementById('totalItems');
const subtotalEl    = document.getElementById('subtotal');
const taxEl         = document.getElementById('tax');
const totalEl       = document.getElementById('total');
const itemCountLabel= document.getElementById('itemCountLabel');
const clearCartBtn  = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {
   if(!localStorage.getItem('sw_logged_in'))
   {
     window.location.href = 'login.html';
   }
   else
   {
    window.location.href = 'checkout.html';
   }
});

const createCartItem = (item, index) => {
  const { id, title, price, thumbnail, quantity } = item;
  const subtotal = (price * quantity).toFixed(2);

  const row = document.createElement('div');

  row.id = `cart-item-${id}`;

  row.className = 'cart-item bg-purple-950 border border-stone-800 rounded-2xl p-4 flex gap-4 fade-up';

  row.style.animationDelay = `${index * 0.06}s`;

  row.innerHTML = `
    <div class="w-20 h-20 sm:w-24 sm:h-24 bg-purple-700 rounded-xl overflow-hidden">
      <img src="${thumbnail}" alt="${title}"
        class="w-full h-full object-cover"
        onerror="this.src='https://placehold.co/200x200/1c1917/f97316?text=?'"/>
    </div>
    
    <div class="flex-1 min-w-0">
      <div class="flex justify-between gap-2 mb-1">
        <p class="text-stone-200 text-sm font-medium line-clamp-2 leading-snug">${title}</p>

        <button class="remove-btn text-stone-950 transition-colors ml-2 mt-0.5" data-id="${id}" title="Remove">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>

      <p class="text-purple-300 font-bold text-base mb-3">$${price.toFixed(2)}</p>

      <div class="flex items-center justify-between flex-wrap gap-3">
        <div class="flex items-center gap-1 bg-stone-800 border border-stone-700 rounded-xl overflow-hidden">
          <button class="qty-btn w-8 h-8 flex items-center justify-center text-stone-300 font-bold hover:bg-purple-700 hover:text-white transition-colors" data-id="${id}" data-action="dec">−</button>
          
          <span class="qty-val text-white text-sm font-medium w-8 text-center" data-id="${id}">${quantity}</span>
          
          <button class="qty-btn w-8 h-8 flex items-center justify-center text-stone-300 font-bold hover:bg-purple-700 hover:text-white transition-colors" data-id="${id}" data-action="inc">+</button>
        </div>
        
        <p class="text-stone-400 text-sm">Subtotal: <span class="text-white font-semibold subtotal-val" data-id="${id}">$${subtotal}</span></p>
      </div>
      
    </div>`;

  row.querySelector('.remove-btn').addEventListener('click', () => removeItem(id));
  row.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      changeQty(id, action);
    });
  });

  return row;
};

const changeQty = (id, action) => {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;

  if (action === 'inc') 
  {
    item.quantity += 1;
  } 
  else 
  {
    item.quantity -= 1;
    if (item.quantity <= 0)
    { 
      removeItem(id);
      return; 
    }
  }

  saveCart(cart);


  const qtyEl = document.querySelector(`.qty-val[data-id="${id}"]`);
  const subEl = document.querySelector(`.subtotal-val[data-id="${id}"]`);

  if (qtyEl) qtyEl.textContent = item.quantity;
  if (subEl) subEl.textContent = `$${(item.price * item.quantity).toFixed(2)}`;

  updateSummary();
};


const removeItem = (id) => {
  const row = document.getElementById(`cart-item-${id}`);

  if (row)
  {
    row.style.transition = 'opacity .3s, transform .3s';
    row.style.opacity = '0';
    row.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      const cart = getCart().filter(i => i.id !== id);
      saveCart(cart);
      renderCart();
    }, 300);
  }
};


const updateSummary = () => {
  const cart = getCart();
  console.log(cart);
  const count    = cart.reduce((s, i) => s + i.quantity, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const tax      = subtotal * 0.08;
  const total    = subtotal + tax;

  totalItems.textContent    = count;
  subtotalEl.textContent    = subtotal.toFixed(2);
  taxEl.textContent         = tax.toFixed(2);
  totalEl.textContent       = total.toFixed(2);
  itemCountLabel.textContent= `${count} item${count !== 1 ? 's' : ''}`;
};


const renderCart = () => {
  const cart = getCart();
  cartItemsList.innerHTML = '';

  if (cart.length === 0) 
  {
    emptyCart.classList.remove('hidden');
    cartContent.classList.add('hidden');
    orderSummary.classList.add('hidden');
    updateSummary();
  } 
  else 
  {
    emptyCart.classList.add('hidden');
    cartContent.classList.remove('hidden');
    orderSummary.classList.remove('hidden');
    cartContent.style.display = 'grid';
    
    cart.forEach((item, i) => cartItemsList.appendChild(createCartItem(item, i)));

    updateSummary();
  }
};

clearCartBtn.addEventListener('click', () => {
  if (confirm('Remove all items from cart?')) {
    saveCart([]);
    renderCart();
  }
});

renderCart();
