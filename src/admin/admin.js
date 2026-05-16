import { supabase } from "../config/supabase.js";
import { LoginPage, activateLogin } from "./login.js";
import { UploadProductPage, activateUploadProduct } from "./uploadProduct.js";

const app = document.getElementById("app");

async function init() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    app.innerHTML = LoginPage();

    activateLogin(() => {
      location.reload();
    });

    return;
  }

  app.innerHTML = UploadProductPage();
  activateUploadProduct();
}

init();