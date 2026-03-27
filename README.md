# لكي سيدتي — Laki Sayidaty 💜

> *Shop like a Lady, Feel like a Queen.*

A modern, fully responsive beauty e-commerce storefront built as a frontend portfolio project. Laki Sayidaty ("For You, My Lady" in Arabic) is a curated shopping experience for fragrances, skincare, and beauty products — featuring a real product catalog, cart management, user authentication flow, and a polished purple-toned UI.

---

## ✨ Features

- **Dynamic Product Catalog** — Fetches live beauty products (fragrances, skincare, cosmetics) from a public API with real images, ratings, and discount badges
- **Smart Filtering & Search** — Filter by category, search by keyword, and sort by price, name, or rating in real time
- **Cart System** — Add, remove, and update item quantities with animated transitions; persistent across page navigation via `localStorage`
- **Live Order Summary** — Subtotal, 8% tax, and total recalculate instantly as the cart changes
- **User Authentication Flow** — Login form with email/password validation; session state managed via `localStorage`; protected checkout route
- **Responsive Design** — Fully mobile-friendly with a collapsible hamburger nav and adaptive grid layouts
- **Animated UI** — Smooth fade-up reveals, hover transitions, floating hero illustration, and slide-in toast notifications
- **Category Pages** — Direct URL-based category filtering (e.g. `products.html?cat=skin-care`)
- **Bilingual Branding** — Arabic logo and brand identity with English UI for a broad audience

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic, accessible) |
| Styling | Tailwind CSS v3 (CDN) |
| Fonts | Google Fonts — Playfair Display + DM Sans |
| Logic | Vanilla JavaScript (ES6+) |
| Data | [DummyJSON API](https://dummyjson.com/) — beauty/skincare/fragrance categories |
| State | `localStorage` (cart + auth session) |
| Hosting | Static — deployable on GitHub Pages, Netlify, or Vercel |

No build tools. No frameworks. No dependencies to install. Just open and run.

---

## 🚀 Getting Started

### Option 1 — Open Directly (Quickest)

No server needed for basic browsing:

```bash
# Clone the repo
git clone https://github.com/your-Gargera/laki-sayidti-ecommerce.git

# Open the entry point in your browser
open home.html
```

> ⚠️ Some browsers block `localStorage` for `file://` URLs. Use Option 2 for full functionality.

### Option 2 — Local Server (Recommended)

```bash
# Using VS Code Live Server extension — just right-click home.html → "Open with Live Server"

# OR using Python
cd laki-sayidaty
python -m http.server 8080
# Visit http://localhost:8080/home.html

# OR using Node.js
npx serve .
```

### Login Credentials

The app uses a simulated auth flow — **any email + password (6+ chars) will work:**

```
Email:    you@example.com
Password: any123
```

---

## 📁 Project Structure

```
laki-sayidaty/
│
├── home.html          # Landing page — hero section + featured products
├── products.html      # Full catalog with search, sort & category filters
├── cart.html          # Cart page with quantity controls & order summary
├── login.html         # Authentication page with form validation
├── checkout.html      # Post-checkout confirmation screen
│
├── home.js            # Featured products fetch + product card rendering
├── products.js        # Full catalog logic — filtering, sorting, pagination
├── cart.js            # Cart rendering, quantity management, summary calc
├── login.js           # Form validation + session management
├── checkout.js        # Back-to-home navigation
│
└── common.js          # Shared utilities:
                       #   getCart / saveCart / addToCart
                       #   updateCartBadge
                       #   setupLogInOut
                       #   setupMobileMenu
                       #   renderStars (star rating helper)
```

---

## 🗺️ App Flow

```
home.html
    │
    ├──► products.html  (browse & filter catalog)
    │         │
    │         └──► cart.html  (review cart)
    │                   │
    │                   ├── [logged in]  ──► checkout.html
    │                   └── [logged out] ──► login.html ──► home.html
    │
    └──► login.html  (sign in / sign out)
```

---

## 🔮 Future Improvements

- [ ] **Product Detail Page** — Dedicated page per product with full description, image gallery, and related items
- [ ] **Backend Integration** — Replace DummyJSON with a real API (e.g. Supabase, Firebase, or a custom Node/Express backend)
- [ ] **Real Payment Flow** — Integrate Stripe or PayPal for actual checkout processing
- [ ] **User Accounts** — Registration, order history, and saved addresses
- [ ] **Wishlist** — Save-for-later functionality alongside the cart
- [ ] **Product Reviews** — User-submitted ratings and comments
- [ ] **RTL Layout** — Full right-to-left support for Arabic-speaking users
- [ ] **PWA Support** — Service worker + manifest for offline browsing and installability
- [ ] **Pagination / Infinite Scroll** — Handle larger product catalogs gracefully
- [ ] **Dark/Light Mode Toggle** — User preference with `prefers-color-scheme` fallback

---

## 🧑‍💻 Credits

- Product data & images — [DummyJSON](https://dummyjson.com/)
- Fonts — [Google Fonts](https://fonts.google.com/) (Playfair Display, DM Sans)
- Styling framework — [Tailwind CSS](https://tailwindcss.com/)
- Built with ❤️ as a frontend portfolio project

---

<div align="center">
  <strong>لكي سيدتي</strong> &nbsp;·&nbsp; For You, My Lady
  <br/>
  <sub>A portfolio project by <a href="https://github.com/your-Gargera">Gargera</a></sub>
</div>
