document.addEventListener("DOMContentLoaded", async function() {
    
    //nungguin file kelar di-download (Async)
    const loadComp = async (url, id) => {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`Gagal muat ${url}`);
            const html = await res.text();
            document.getElementById(id).innerHTML = html;
        } catch (err) {
            console.error(err);
        }
    };

    const urlParams = new URLSearchParams(window.location.search);

    //navbar
    await loadComp('../navigation.html', 'navbar-placeholder');

    //breadcrumb
    await loadComp('../component/breadcrumb/breadcrumb.html', 'pathbar-placeholder');
    
    //cari ID-nya SETELAH loadComp selesai (pake await)
    const listContainer = document.getElementById('breadcrumb-list');
    
    if (listContainer) {
        urlParams.forEach((value, key) => {
            if (['cat', 'name', 'step'].includes(key)) {
                // Separator /
                const sep = document.createElement('span');
                sep.innerText = ' / ';
                listContainer.appendChild(sep);

                // Bikin Link
                const item = document.createElement('a');
                item.innerText = decodeURIComponent(value).replace(/-/g, ' ');
                item.className = "breadcrumb-item";
                
                // LOGIKA TUJUAN FIX
                if (key === 'cat') {
                    item.href = `../katalog page/katalog_${value.toLowerCase()}.html`; 
                } else if (key === 'name') {
                    // Link balik ke halaman produk itu sendiri
                    const cat = urlParams.get('cat');
                    const img = urlParams.get('img');
                    const price = urlParams.get('price');
                    item.href = `barang_page.html?cat=${cat}&name=${value}&price=${price}&img=${img}`;
                } else {
                    item.href = "#"; // Level terakhir (step) nggak usah link
                    item.style.pointerEvents = "none";
                }

                listContainer.appendChild(item);
            }
        });
    }

    // product container
    // Kita isi datanya TEPAT setelah HTML-nya berhasil ditempel (di dalam .then)
    await loadComp('../component/product-container/product-container.html', 'product-placeholder');
    
    // Ambil data URL
    const pName = urlParams.get('name');
    const pPrice = urlParams.get('price');
    const pCat = urlParams.get('cat')?.toLowerCase(); // Paksa kecil biar aman
    const pImg = urlParams.get('img');
    const pDesc = urlParams.get('desc');

    // MENGISI DATA (setelah await loadComp)
    const nameEl = document.getElementById('main-product-name');
    const priceEl = document.getElementById('main-product-price');
    const descEl = document.getElementById('main-product-desc');
    const imgEl = document.getElementById('main-product-img');

    if (nameEl && pName) nameEl.innerText = pName.replace(/-/g, ' ');
    if (priceEl && pPrice) priceEl.innerText = pPrice; // Gak pake "Rp" lagi biar gak double
    if (descEl && pDesc) descEl.innerText = decodeURIComponent(pDesc).replace(/-/g, ' ');

    // LOGIKA GAMBAR
    if (imgEl && pImg && pCat) {
        const fullPath = `../asset_foto/${pCat}/${pImg}`;
        imgEl.src = fullPath;
        
        imgEl.onerror = () => { 
            console.error("File Gak Ada:", fullPath);
            imgEl.src = '../asset_foto/placeholder.jpg'; 
        };
    }
});