import { getProducts } from "../services/productService";
import { addToCart, getCartCount } from "../services/cartService";
import { renderCartItems } from "./CartDrawer";

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(number);
}

export function ProductSection() {
  return `
    <section id="produk" class="py-20">
      <div class="max-w-7xl mx-auto px-5">
        <h2 class="text-4xl font-bold mb-10">
          Produk Unggulan
        </h2>

        <div id="productGrid" class="grid md:grid-cols-3 gap-8">
          <p>Memuat produk...</p>
        </div>
      </div>
    </section>
  `;
}

export async function renderProducts() {
  const grid = document.getElementById("productGrid");

  try {
    const products = await getProducts();

    grid.innerHTML = products.map(product => `
      <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
        <img
          src="${product.image_url}"
          class="h-72 w-full object-cover"
          alt="${product.name}"
        />

        <div class="p-6">
          <h3 class="text-xl font-bold mb-2">
            ${product.name}
          </h3>

          <p class="text-gray-600 mb-4">
            ${product.description || ""}
          </p>

          <div class="mb-4">
            <span class="text-2xl font-bold text-yellow-700">
              ${rupiah(product.price)}
            </span>
          </div>

          <button 
            class="add-cart-btn w-full bg-green-900 text-white py-3 rounded-full hover:bg-yellow-700 transition"
            data-id="${product.id}"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </article>
    `).join("");

    document.querySelectorAll(".add-cart-btn").forEach(button => {
  button.addEventListener("click", () => {

    const productId = Number(button.dataset.id);

    const selectedProduct = products.find(
      product => product.id === productId
    );

    addToCart(selectedProduct);

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
      cartCount.textContent = getCartCount();
    }

    renderCartItems();

    button.textContent = "Berhasil Ditambahkan ✓";

    setTimeout(() => {
      button.textContent = "Tambah ke Keranjang";
    }, 1500);

  });
});

  } catch (err) {
    grid.innerHTML = `<p class="text-red-600">${err.message}</p>`;
  }
}