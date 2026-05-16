export function Hero() {
  return `
    <section class="pt-32 pb-20">
      <div class="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-5xl font-bold mb-6">
            Premium Skincare Modern
          </h2>

          <p class="text-gray-600 mb-8">
            Produk skincare premium untuk kulit sehat dan glowing.
          </p>

          <a href="#produk" class="bg-green-900 text-white px-7 py-4 rounded-full">
            Belanja Sekarang
          </a>
        </div>

        <img
          src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=900&q=80"
          class="rounded-3xl shadow-xl"
        />
      </div>
    </section>
  `;
}