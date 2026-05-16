import {
  getCart,
  getCartCount,
  getCartTotal,
  removeFromCart,
  clearCart
} from "../services/cartService";

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

export function CartDrawer() {
  return `
    <div id="cartOverlay" class="fixed inset-0 bg-black/40 z-[80] hidden"></div>

    <aside id="cartDrawer" class="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[90] shadow-2xl translate-x-full transition duration-300 flex flex-col">
      <div class="p-5 border-b flex justify-between items-center">
        <div>
          <h2 class="text-2xl font-bold">Keranjang</h2>
          <p class="text-sm text-gray-500">
            <span id="drawerCartCount">${getCartCount()}</span> item dipilih
          </p>
        </div>

        <button id="closeCart" class="text-2xl bg-gray-100 w-10 h-10 rounded-full hover:bg-gray-200">
          ×
        </button>
      </div>

      <div id="cartItems" class="flex-1 overflow-y-auto p-5 space-y-4"></div>

      <div class="border-t p-5 bg-gray-50">
        <div class="flex justify-between mb-4">
          <span class="font-semibold">Total</span>
          <span id="cartTotal" class="text-xl font-bold text-yellow-700">
            ${rupiah(getCartTotal())}
          </span>
        </div>

        <button id="checkoutBtn" class="w-full bg-green-900 text-white py-3 rounded-full font-semibold hover:bg-yellow-700 transition mb-3">
          Checkout via WhatsApp
        </button>

        <button id="clearCartBtn" class="w-full border border-red-300 text-red-600 py-3 rounded-full font-semibold hover:bg-red-50 transition">
          Kosongkan Keranjang
        </button>
      </div>
    </aside>
  `;
}

export function renderCartItems() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const drawerCartCount = document.getElementById("drawerCartCount");
  const headerCartCount = document.getElementById("cartCount");

  const cart = getCart();

  if (headerCartCount) headerCartCount.textContent = getCartCount();
  if (drawerCartCount) drawerCartCount.textContent = getCartCount();
  if (cartTotal) cartTotal.textContent = rupiah(getCartTotal());

  if (!cartItems) return;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="text-center py-16">
        <div class="text-5xl mb-4">🛒</div>
        <h3 class="text-xl font-bold mb-2">Keranjang masih kosong</h3>
        <p class="text-gray-500">Tambahkan produk favorit Anda terlebih dahulu.</p>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => `
    <div class="flex gap-4 bg-gray-50 rounded-2xl p-4">
      <img
        src="${item.image_url}"
        alt="${item.name}"
        class="w-20 h-20 object-cover rounded-xl"
      />

      <div class="flex-1">
        <h3 class="font-bold">${item.name}</h3>
        <p class="text-sm text-gray-500 mb-1">Qty: ${item.quantity}</p>
        <p class="font-semibold text-yellow-700">
          ${rupiah(item.price * item.quantity)}
        </p>
      </div>

      <button class="remove-cart text-red-500 font-bold" data-id="${item.id}">
        Hapus
      </button>
    </div>
  `).join("");

  document.querySelectorAll(".remove-cart").forEach(button => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.id));
      renderCartItems();
    });
  });
}

export function activateCartDrawer() {
  const cartButton = document.getElementById("cartButton");
  const closeCart = document.getElementById("closeCart");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartOverlay = document.getElementById("cartOverlay");
  const clearCartBtn = document.getElementById("clearCartBtn");
  const checkoutBtn = document.getElementById("checkoutBtn");

  function openCart() {
    renderCartItems();
    cartDrawer.classList.remove("translate-x-full");
    cartOverlay.classList.remove("hidden");
  }

  function closeCartDrawer() {
    cartDrawer.classList.add("translate-x-full");
    cartOverlay.classList.add("hidden");
  }

  cartButton?.addEventListener("click", openCart);
  closeCart?.addEventListener("click", closeCartDrawer);
  cartOverlay?.addEventListener("click", closeCartDrawer);

  clearCartBtn?.addEventListener("click", () => {
    clearCart();
    renderCartItems();
  });

  checkoutBtn?.addEventListener("click", () => {
    const cart = getCart();

    if (cart.length === 0) {
      alert("Keranjang masih kosong.");
      return;
    }

    const message = cart.map((item, index) => {
      return `${index + 1}. ${item.name} x${item.quantity} - ${rupiah(item.price * item.quantity)}`;
    }).join("%0A");

    const total = rupiah(getCartTotal());

    window.open(
      `https://wa.me/6281279098066?text=Halo,%20saya%20ingin%20checkout:%0A%0A${message}%0A%0ATotal:%20${total}`,
      "_blank"
    );
  });
}