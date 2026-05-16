import { getCartCount } from "../services/cartService";

export function Header() {
  return `
    <header class="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <nav class="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold">
          Zacky<span class="text-yellow-600">Shop</span>
        </h1>

        <div class="flex items-center gap-3">
          <a
            href="/admin.html"
            class="border border-green-900 text-green-900 px-5 py-2 rounded-full hover:bg-green-900 hover:text-white transition"
          >
            Admin
          </a>

          <button
            id="cartButton"
            class="bg-green-900 text-white px-5 py-2 rounded-full hover:bg-yellow-700 transition"
          >
            Keranjang <span id="cartCount">${getCartCount()}</span>
          </button>
        </div>
      </nav>
    </header>
  `;
}