import { supabase } from "../config/supabase.js";

export function UploadProductPage() {
  return `
    <div class="min-h-screen bg-[#F8F5EF]">
      <header class="bg-white border-b sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 class="text-2xl font-bold">
              Zacky<span class="text-yellow-700">Shop</span> Admin
            </h1>
            <p class="text-sm text-gray-500">Kelola produk toko Anda</p>
          </div>

          <div class="flex gap-3">
            <a href="/" class="px-5 py-2.5 rounded-full border border-green-900 text-green-900 hover:bg-green-900 hover:text-white">
              Lihat Website
            </a>

            <button id="logoutBtn" class="px-5 py-2.5 rounded-full bg-red-500 text-white hover:bg-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-6 py-10">
        <div class="grid lg:grid-cols-[1.2fr_.8fr] gap-8">
          
          <section class="bg-white rounded-[2rem] shadow-xl p-8">
            <div class="mb-8">
              <span class="inline-block bg-green-100 text-green-900 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                Tambah Produk Baru
              </span>

              <h2 class="text-4xl font-bold mb-2">Upload Produk</h2>
              <p class="text-gray-500">
                Isi detail produk, upload gambar, lalu simpan ke database Supabase.
              </p>
            </div>

            <form id="productForm" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="block font-semibold mb-2">Nama Produk</label>
                  <input id="name" type="text" placeholder="Contoh: Hydra Glow Serum" class="input-field" required />
                </div>

                <div>
                  <label class="block font-semibold mb-2">Kategori</label>
                  <input id="category" type="text" placeholder="Contoh: Serum" class="input-field" />
                </div>

                <div>
                  <label class="block font-semibold mb-2">Harga</label>
                  <input id="price" type="number" placeholder="199000" class="input-field" required />
                </div>

                <div>
                  <label class="block font-semibold mb-2">Harga Coret</label>
                  <input id="old_price" type="number" placeholder="299000" class="input-field" />
                </div>

                <div>
                  <label class="block font-semibold mb-2">Stok</label>
                  <input id="stock" type="number" placeholder="25" class="input-field" />
                </div>

                <div>
                  <label class="block font-semibold mb-2">Badge</label>
                  <input id="badge" type="text" placeholder="Best Seller / New / Diskon" class="input-field" />
                </div>
              </div>

              <div>
                <label class="block font-semibold mb-2">Deskripsi Produk</label>
                <textarea id="description" placeholder="Tulis deskripsi singkat produk..." class="input-field h-32 resize-none"></textarea>
              </div>

              <div>
                <label class="block font-semibold mb-2">Gambar Produk</label>

                <label for="image" class="border-2 border-dashed border-gray-300 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-green-900 hover:bg-green-50 transition">
                  <div class="text-5xl mb-3">📷</div>
                  <p class="font-bold">Klik untuk upload gambar</p>
                  <p class="text-sm text-gray-500">Format JPG, PNG, WEBP</p>
                  <input id="image" type="file" accept="image/*" class="hidden" required />
                </label>
              </div>

              <button id="submitBtn" type="submit" class="w-full bg-green-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-yellow-700 shadow-lg">
                Simpan Produk
              </button>
            </form>
          </section>

          <aside class="space-y-6">
            <div class="bg-white rounded-[2rem] shadow-xl p-6">
              <h3 class="text-2xl font-bold mb-4">Preview Produk</h3>

              <div class="rounded-3xl overflow-hidden bg-gray-100 mb-5">
                <img id="previewImage" src="https://via.placeholder.com/600x500?text=Preview+Produk" class="w-full h-72 object-cover" />
              </div>

              <div>
                <span id="previewBadge" class="inline-block bg-yellow-700 text-white text-sm px-3 py-1 rounded-full mb-3">
                  Badge
                </span>

                <h4 id="previewName" class="text-2xl font-bold mb-2">
                  Nama Produk
                </h4>

                <p id="previewDescription" class="text-gray-500 mb-4">
                  Deskripsi produk akan tampil di sini.
                </p>

                <div>
                  <span id="previewOldPrice" class="line-through text-gray-400 mr-2">
                    Rp0
                  </span>
                  <span id="previewPrice" class="text-2xl font-bold text-yellow-700">
                    Rp0
                  </span>
                </div>
              </div>
            </div>

            <div class="bg-green-900 text-white rounded-[2rem] p-6">
              <h3 class="text-xl font-bold mb-2">Tips Upload</h3>
              <p class="text-white/70 text-sm">
                Gunakan gambar rasio kotak atau portrait agar tampilan produk lebih rapi di landing page.
              </p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  `;
}

function rupiah(number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(Number(number || 0));
}

export function activateUploadProduct() {
  const form = document.getElementById("productForm");
  const logoutBtn = document.getElementById("logoutBtn");
  const submitBtn = document.getElementById("submitBtn");

  const imageInput = document.getElementById("image");
  const previewImage = document.getElementById("previewImage");

  const nameInput = document.getElementById("name");
  const badgeInput = document.getElementById("badge");
  const descriptionInput = document.getElementById("description");
  const priceInput = document.getElementById("price");
  const oldPriceInput = document.getElementById("old_price");

  logoutBtn.addEventListener("click", async () => {
    await supabase.auth.signOut();
    location.reload();
  });

  function updatePreview() {
    document.getElementById("previewName").textContent =
      nameInput.value || "Nama Produk";

    document.getElementById("previewBadge").textContent =
      badgeInput.value || "Badge";

    document.getElementById("previewDescription").textContent =
      descriptionInput.value || "Deskripsi produk akan tampil di sini.";

    document.getElementById("previewPrice").textContent =
      rupiah(priceInput.value);

    document.getElementById("previewOldPrice").textContent =
      rupiah(oldPriceInput.value);
  }

  [nameInput, badgeInput, descriptionInput, priceInput, oldPriceInput].forEach((input) => {
    input.addEventListener("input", updatePreview);
  });

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];

    if (file) {
      previewImage.src = URL.createObjectURL(file);
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Menyimpan produk...";

    try {
      const imageFile = imageInput.files[0];

      if (!imageFile) {
        alert("Pilih gambar produk terlebih dahulu.");
        return;
      }

      const safeName = imageFile.name.replaceAll(" ", "-").toLowerCase();
      const fileName = `${Date.now()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(fileName, imageFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("products")
        .getPublicUrl(fileName);

      const { error } = await supabase.from("products").insert({
        name: nameInput.value,
        category: document.getElementById("category").value,
        description: descriptionInput.value,
        image_url: data.publicUrl,
        price: Number(priceInput.value),
        old_price: Number(oldPriceInput.value || 0),
        stock: Number(document.getElementById("stock").value || 0),
        badge: badgeInput.value,
      });

      if (error) throw error;

      alert("Produk berhasil ditambahkan.");
      form.reset();
      previewImage.src = "https://via.placeholder.com/600x500?text=Preview+Produk";
      updatePreview();
    } catch (error) {
      alert(error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Simpan Produk";
    }
  });
}