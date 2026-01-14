let cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("cart-list");
const paymentSelect = document.getElementById("payment");
const transferBox = document.getElementById("transfer-box");
const qrisBox = document.getElementById("qris-box");
const sendProofBox = document.getElementById("send-proof");

render();

function render() {
  list.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    total += item.price;
    list.innerHTML += `
   <div class="bg-white p-2 mb-2 flex justify-between rounded">
     <span>${item.name}</span>
     <span>${item.price}k 
      <button onclick="removeItem(${i})" class="text-red-500 font-bold">x</button>
     </span>
   </div>`;
  });
  list.innerHTML += `<p class="font-bold mt-2">Total: ${total}k</p>`;
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  render();
}

// Tampilkan info pembayaran
paymentSelect.addEventListener("change", () => {
  let pay = paymentSelect.value;
  transferBox.classList.add("hidden");
  qrisBox.classList.add("hidden");
  sendProofBox.classList.add("hidden");

  if (pay === "Transfer") transferBox.classList.remove("hidden");
  if (pay === "QRIS") qrisBox.classList.remove("hidden");
});

function processCheckout() {
  if (cart.length === 0) {
    alert("Keranjang kosong!");
    return;
  }

  let name = document.getElementById("buyer-name").value.trim();
  let address = document.getElementById("buyer-address").value.trim();

  if (name === "" || address === "") {
    alert("Isi nama dan alamat dulu!");
    return;
  }

  let pay = paymentSelect.value;

  // CASH langsung kirim
  if (pay === "Cash") {
    let text = buildText(name, address, pay);
    openWA(text);
    finishOrder();
  }

  // TRANSFER / QRIS → tampil tombol kirim bukti
  if (pay === "Transfer" || pay === "QRIS") {
    sendProofBox.classList.remove("hidden");
    alert("Silakan lakukan pembayaran, lalu klik Kirim Bukti Pembayaran.");
  }
}

function sendProof() {
  let name = document.getElementById("buyer-name").value.trim();
  let address = document.getElementById("buyer-address").value.trim();
  let pay = paymentSelect.value;

  let text =
    buildText(name, address, pay) +
    "%0ASaya sudah melakukan pembayaran, berikut bukti:";

  openWA(text);
  finishOrder();
}

function buildText(name, address, payment) {
  let text = `Nama: ${name}%0AAlamat: ${address}%0A%0A`;
  text += "Pesanan:%0A";
  let total = 0;
  cart.forEach((i) => {
    text += `- ${i.name} (${i.price}k)%0A`;
    total += i.price;
  });
  text += `%0ATotal: ${total}k%0APembayaran: ${payment}`;
  return text;
}

function openWA(text) {
  let phone = "6281362701574"; // GANTI NOMOR WA TOKO
  window.open(`https://wa.me/${phone}?text=${text}`);
}

// =====================
// SELESAIKAN ORDER
// =====================
function finishOrder() {
  // kosongkan cart
  localStorage.removeItem("cart");

  // redirect ke halaman terima kasih
  setTimeout(() => {
    window.location.href = "thanks.html";
  }, 500);
}
