document.addEventListener("DOMContentLoaded", async function () {
  const loadComp = async (url, id) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`gagal ${res.statusText}`);
      const html = await res.text();
      const target = document.getElementById(id);
      if (target) target.innerHTML = html;
    } catch (err) {
      console.error(err);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);

  //komponen
  await loadComp("../navigation.html", "navbar-placeholder");
  await loadComp(
    "../component/breadcrumb/breadcrumb.html",
    "pathbar-placeholder",
  );

  const listContainer = document.getElementById("breadcrumb-list");
  if (!listContainer) return;
  listContainer.innerHTML = "";

  //path sub-folder
  const path = window.location.pathname; //cek
  const isSub =
    path.includes("/katalog-page/") ||
    path.includes("/toko-page/") ||
    path.includes("/transaksi-page/") ||
    path.includes("/user-page/") ||
    path.includes("/chat-page/");
  const prefix = isSub ? "../" : "";

  //ikon
  const logoIkon = document.createElement("img");
  logoIkon.id = "ikon";
  logoIkon.src = `${prefix}asset_foto/ikon/logo.png`;
  logoIkon.alt = "home-icon";
  listContainer.appendChild(logoIkon);

  //home
  const homeItem = document.createElement("a");
  homeItem.innerText = "Home";
  homeItem.href = `${prefix}index.html`;
  homeItem.className = "breadcrumb-item";
  listContainer.appendChild(homeItem);

  //rute
  let urutanTampil = ["cat", "name"];
  if (urlParams.has("cart")) urutanTampil.push("cart");
  if (urlParams.has("checkout")) urutanTampil.push("checkout");
  else if (urlParams.has("trx")) urutanTampil.push("trx");
  else if (urlParams.has("toko")) {
    urutanTampil.push("toko");
    if (path.includes("chat_page")) urutanTampil.push("chat");
  }
  urutanTampil.forEach((key) => {
    let value = urlParams.get(key);
    if (key === "cart") value = "Keranjang";
    else if (key === "checkout") value = "Checkout";
    else if (key === "chat" && !value) value = "Chat";

    if (value) {
      //jarak
      const sep = document.createElement("span");
      sep.innerText = " / ";
      listContainer.appendChild(sep);

      const item = document.createElement("a");
      item.innerText = decodeURIComponent(value).replace(/-/g, " ");
      item.className = "breadcrumb-item";

      const currentData = new URLSearchParams(window.location.search);

      //href key
      if (key === "cat")
        item.href = `${prefix}katalog-page/katalog_${value.toLowerCase()}.html?cat=${value}`;
      else if (key === "cart")
        item.href = `${prefix}transaksi-page/keranjang.html?cart=true`;
      else if (key === "checkout")
        item.href = `checkout.html?${currentData.toString()}`;
      else if (key === "name") {
        const b = new URLSearchParams(window.location.search);
        ["toko", "trx", "chat"].forEach((k) => b.delete(k));
        item.href = `${prefix}toko-page/barang_page.html?${b.toString()}`;
      } else if (key === "toko") {
        const b = new URLSearchParams(window.location.search);
        b.delete("chat");
        item.href = `${prefix}toko-page/toko_page.html?${b.toString()}`;
      } else if (key === "trx")
        item.href = `${prefix}transaksi-page/${value.toLowerCase()}.html?${currentData.toString()}`;
      else if (key === "chat")
        item.href = `chat_page.html?${currentData.toString()}`;

      //link ujung mati
      const paramsPresent = urutanTampil.filter(
        (k) => urlParams.has(k) || k === "chat",
      );
      if (key === paramsPresent[paramsPresent.length - 1]) {
        item.href = "#";
        item.style.pointerEvents = "none";
        item.style.fontWeight = "bold";
      }
      listContainer.appendChild(item);
    }
  });
});
