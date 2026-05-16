import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { ProductSection, renderProducts } from "./components/ProductSection";
import { Footer } from "./components/Footer";
import { CartDrawer, activateCartDrawer } from "./components/CartDrawer";

const app = document.getElementById("app");

app.innerHTML = `
  ${Header()}
  ${Hero()}
  ${ProductSection()}
  ${Footer()}
  ${CartDrawer()}
`;

renderProducts();
activateCartDrawer();