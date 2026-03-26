document.addEventListener("DOMContentLoaded", async function () {
    const loadComp = async (url, id) => {
        try {
            const res = await fetch(url);
            const html = await res.text();
            const target = document.getElementById(id);
            if (target) target.innerHTML = html;
        } catch (err) { console.error(err); }
    };

    const urlParams = new URLSearchParams(window.location.search);

    //container produk
    await loadComp("../component/product-container/product-container.html", "product-placeholder");

    //data URL
    const data = {
        name: urlParams.get("name"),
        price: urlParams.get("price"),
        cat: urlParams.get("cat"),
        img: urlParams.get("img"),
        desc: urlParams.get("desc")
    };

    const nameEl = document.getElementById("main-product-name");
    const priceEl = document.getElementById("main-product-price");
    const descEl = document.getElementById("main-product-desc");
    const imgEl = document.getElementById("main-product-img");

    if (nameEl && data.name) nameEl.innerText = data.name.replace(/-/g, " ");
    if (priceEl && data.price) priceEl.innerText = data.price;
    if (descEl && data.desc) descEl.innerText = decodeURIComponent(data.desc).replace(/-/g, " ");

    if (imgEl && data.img && data.cat) {
        const folder = data.cat.toLowerCase().split("-")[0];
        imgEl.src = `../asset_foto/${folder}/${data.img}`;
        imgEl.onerror = () => imgEl.src = "../asset_foto/placeholder.jpg";
    }
});