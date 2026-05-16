import { supabase } from "../config/supabase.js";

export function LoginPage() {
  return `
    <div class="min-h-screen flex items-center justify-center p-6">
      <div class="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        <h1 class="text-3xl font-bold mb-2">Admin Login</h1>
        <p class="text-gray-500 mb-8">Login untuk mengelola produk.</p>

        <form id="loginForm" class="space-y-5">
          <input id="email" type="email" placeholder="Email" class="w-full border rounded-xl px-4 py-3" required />
          <input id="password" type="password" placeholder="Password" class="w-full border rounded-xl px-4 py-3" required />

          <button type="submit" class="w-full bg-green-900 text-white py-3 rounded-xl font-semibold">
            Login
          </button>
        </form>
      </div>
    </div>
  `;
}

export function activateLogin(onSuccess) {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    });

    if (error) {
      alert(error.message);
      return;
    }

    onSuccess();
  });
}