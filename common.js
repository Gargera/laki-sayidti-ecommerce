const loginBtn = document.getElementById("loginBtn");
const loginMobile = document.getElementById("loginMobile");

const getCart = () => JSON.parse(localStorage.getItem('sw_cart') || '[]');

const saveCart = (cart) => {
  localStorage.setItem('sw_cart', JSON.stringify(cart));
  updateCartBadge();
};

const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  
  if (existing) 
  {
    existing.quantity += 1;
  } 
  else 
  {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

const updateCartBadge = () => {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = total;
    el.classList.toggle('hidden', total === 0);
  });
};


const LogInOut = (inner) => {
    loginMobile.innerText = inner;
    loginBtn.innerText = inner;
    console.log("es");
}

const setupLogInOut = () => {
  if (!localStorage.getItem('sw_logged_in')) 
  {
    LogInOut("Login");
  }
  else
  {
    LogInOut("Logout");
  }

  const LogBtn = () => {
    if(loginBtn.innerText === "Login")
    {
       window.location.href = 'login.html';
    }
    else
    {
      if(confirm("Are You Sure Sweetie ? 😔 We're really going to miss you! 🥺💜"))
      {
        LogInOut("Login");
        localStorage.removeItem('sw_logged_in');
      }
    }
  }
  
  loginBtn.addEventListener('click', LogBtn);
  loginMobile.addEventListener('click', LogBtn);
};


const setupMobileMenu = () => {
  const btn = document.getElementById('mobileIcon');
  const menu = document.getElementById('mobileMenu');

  menu.classList.add("hidden");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
    menu.classList.toggle("flex");
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      menu.classList.add("hidden");
      menu.classList.remove("flex");
    }
  });
};


const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < 5; i++) {
    if (i < full) stars += '★';
    else if (i === full && half) stars += '½';
    else stars += '☆';
  }
  return `<span class="text-yellow-400 text-xs">${stars}</span>`;
};


document.addEventListener('DOMContentLoaded', () => {
  setupLogInOut();
  setupMobileMenu();
  updateCartBadge();
});