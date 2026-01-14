// ================= MENU DATA =================
const foods = [
  { name: "Nasi + Ayam Palekko", price: 12, image: "nasi-ayam-palekko.jpeg" },
  { name: "Nasi + Telur", price: 8, image: "nasi-telur.jpeg" },
  { name: "Bakso Bakar", price: 5, image: "bakso-bakar.jpeg" },
  { name: "Bakso Goreng", price: 5, image: "bakso-goreng.jpeg" },
  { name: "Bakso Mercon", price: 5, image: "bakso-mercon.jpeg" },
  { name: "Burger Beef", price: 7, image: "burger-beef.jpeg" },
  { name: "Kebab Manis", price: 5, image: "kebab-manis.jpeg" },
  { name: "Kebab Sayur", price: 7, image: "kebab-sayur.jpeg" },
  { name: "Mie Gocek Original", price: 5, image: "mie-gocek-original.jpeg" },
  { name: "Mie Gocek Bakso", price: 8, image: "mie-gocek-bakso.jpeg" },
  { name: "Mie Gocek Telur", price: 10, image: "mie-gocek-telur.jpeg" },
  { name: "Pisang Nugget", price: 5, image: "pisang-nuget.jpeg" },
  { name: "Somay Goreng", price: 5, image: "somay-goreng.jpeg" },
  { name: "Tahu Bakar", price: 5, image: "tahu-bakar.jpeg" },
  { name: "Tahu Goreng", price: 5, image: "tahu-goreng.jpeg" },
  { name: "Tahu Mercon", price: 5, image: "tahu-mercon.jpeg" },
];

const drinks = [
  { name: "Ice All Varian", price: 5 },
  { name: "Es Teh", price: 5 },
  { name: "Gula Aren", price: 5 },
  { name: "Extrajoss", price: 5 },
  { name: "Kukubima", price: 5 },
  { name: "Nutrisari", price: 5 },
  { name: "Jasjus Varian", price: 5 },
  { name: "Top Ice Varian", price: 5 },
  { name: "Milo", price: 5 },
  { name: "Hilo Coklat & Thai Tea", price: 5 },
  { name: "Chocolatos Drink", price: 5 },
  { name: "Chocolatos Matcha", price: 5 },
  { name: "Drink Beng-Beng", price: 5 },
];

// ================= INIT =================

const foodList = document.getElementById("food-list");
const drinkList = document.getElementById("drink-list");
const cartCount = document.getElementById("cart-count");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= RENDER FOOD (PAKAI FOTO) =================
function renderFood(list) {
  foodList.innerHTML = "";
  list.forEach((item) => {
    foodList.innerHTML += `
      <div class="bg-white p-3 rounded-2xl shadow-md">

        <img
          src="assets/img/food/${item.image}"
          alt="${item.name}"
          class="w-full aspect-square object-cover rounded-xl">

        <h3 class="font-bold mt-3 text-sm line-clamp-2">${item.name}</h3>

        <p class="text-xs text-gray-600 mb-2">${item.price}k</p>

        <button
          class="mt-1 bg-orange-500 text-white w-full py-2 rounded-xl text-sm active:scale-95"
          onclick="addCart(this,'${item.name}',${item.price})">
          + Tambah ke Keranjang
        </button>
      </div>
    `;
  });
}

// ================= RENDER DRINK (TANPA FOTO) =================
function renderDrink(list) {
  drinkList.innerHTML = "";
  list.forEach((item) => {
    drinkList.innerHTML += `
      <div class="bg-white p-3 rounded-lg shadow flex flex-col h-full">
        
        <div>
          <h3 class="font-bold text-sm line-clamp-2">${item.name}</h3>
          <p class="text-xs text-gray-600">${item.price}k</p>
        </div>

        <button
          class="mt-auto bg-orange-500 text-white w-full p-2 rounded text-sm"
          onclick="addCart(this,'${item.name}',${item.price})">
          + Keranjang
        </button>

      </div>
    `;
  });
}

// ================= ADD CART =================

function addCart(button, name, price) {
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  const originalText = button.innerHTML;
  button.innerHTML = "✔ Ditambahkan";
  button.classList.remove("bg-orange-500");
  button.classList.add("bg-green-500");

  setTimeout(() => {
    button.innerHTML = originalText;
    button.classList.remove("bg-green-500");
    button.classList.add("bg-orange-500");
  }, 1000);

  cartCount.classList.add("pop");
  setTimeout(() => cartCount.classList.remove("pop"), 300);
}

// ================= CART COUNT =================

function updateCartCount() {
  cartCount.innerText = cart.length;
}

// ================= SEARCH =================

document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();

  renderFood(foods.filter((f) => f.name.toLowerCase().includes(q)));
  renderDrink(drinks.filter((d) => d.name.toLowerCase().includes(q)));
});

// ================= START =================

renderFood(foods);
renderDrink(drinks);
updateCartCount();
