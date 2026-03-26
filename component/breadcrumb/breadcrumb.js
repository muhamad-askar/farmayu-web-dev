document.addEventListener("DOMContentLoaded", async function () {
    const loadComp = async (url, id) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Gagal muat ${res.statusText}`);
            const html = await res.text();
            const target = document.getElementById(id);
            if (target) target.innerHTML = html;
        } catch (err) {
            console.error(err);
        }
    };

    const urlParams = new URLSearchParams(window.location.search);

    // 1. Muat Komponen
    await loadComp("../navigation.html", "navbar-placeholder");
    await loadComp("../component/breadcrumb/breadcrumb.html", "pathbar-placeholder");

    const listContainer = document.getElementById("breadcrumb-list");
    if (!listContainer) return;

    // Bersihkan isi container sebelum diisi ulang
    listContainer.innerHTML = "";

    // 2. LOGIKA PATH (Deteksi Sub-folder)
    // Cek apakah URL saat ini mengandung nama folder sub
    const path = window.location.pathname;
    const isSub = path.includes("/katalog-page/") || path.includes("/toko-page/") || path.includes("/transaksi-page/") || path.includes("/user-page/");

    const prefix = isSub ? "../" : "";

    // 3. TAMBAHKAN IKON
    const logoIkon = document.createElement("img");
    logoIkon.id = "ikon";
    logoIkon.src = `${prefix}asset_foto/ikon/logo.png`;
    logoIkon.alt = "home-icon";
    listContainer.appendChild(logoIkon);

    // 4. LINK HOME
    const homeItem = document.createElement("a");
    homeItem.innerText = "Home";
    homeItem.href = `${prefix}index.html`;
    homeItem.className = "breadcrumb-item";
    listContainer.appendChild(homeItem);

    // 5. URUTAN RUTE
    let urutanTampil = ["cat", "name"];
    if (urlParams.has("cart")) urutanTampil.push("cart");
    if (urlParams.has("checkout")) urutanTampil.push("checkout");
    else if (urlParams.has("trx")) urutanTampil.push("trx");
    else if (urlParams.has("toko")) {
        urutanTampil.push("toko");
        if (path.includes("chat_page")) urutanTampil.push("chat");
    }

    // 6. RENDER ITEM RUTE
    urutanTampil.forEach((key) => {
        let value = urlParams.get(key);

        // Alias Teks
        if (key === "cart") value = "Keranjang";
        else if (key === "checkout") value = "Checkout";
        else if (key === "chat" && !value) value = "Chat";

        if (value) {
            // Separator /
            const sep = document.createElement("span");
            sep.innerText = " / ";
            listContainer.appendChild(sep);

            // Item Link
            const item = document.createElement("a");
            item.innerText = decodeURIComponent(value).replace(/-/g, " ");
            item.className = "breadcrumb-item";

            const currentData = new URLSearchParams(window.location.search);

            // Atur HREF berdasarkan key
            if (key === "cat") item.href = `${prefix}katalog-page/katalog_${value.toLowerCase()}.html?cat=${value}`;
            else if (key === "cart") item.href = `${prefix}transaksi-page/keranjang.html?cart=true`;
            else if (key === "checkout") item.href = `checkout.html?${currentData.toString()}`;
            else if (key === "name") {
                const b = new URLSearchParams(window.location.search);
                ["toko", "trx", "chat"].forEach(k => b.delete(k));
                item.href = `${prefix}toko-page/barang_page.html?${b.toString()}`;
            } 
            else if (key === "toko") {
                const b = new URLSearchParams(window.location.search);
                b.delete("chat");
                item.href = `${prefix}toko-page/toko_page.html?${b.toString()}`;
            } 
            else if (key === "trx") item.href = `${prefix}transaksi-page/${value.toLowerCase()}.html?${currentData.toString()}`;
            else if (key === "chat") item.href = `chat_page.html?${currentData.toString()}`;

            // Matikan link untuk level paling ujung
            const paramsPresent = urutanTampil.filter((k) => urlParams.has(k) || k === "chat");
            if (key === paramsPresent[paramsPresent.length - 1]) {
                item.href = "#";
                item.style.pointerEvents = "none";
                item.style.fontWeight = "bold";
            }
            listContainer.appendChild(item);
        }
    });
});