function addMenu() {
  let name = document.getElementById("name").value;
  let price = parseInt(document.getElementById("price").value);
  let type = document.getElementById("type").value;

  let data = JSON.parse(localStorage.getItem(type)) || [];
  data.push({ name, price });
  localStorage.setItem(type, JSON.stringify(data));

  alert("Menu berhasil ditambahkan!");
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
}
