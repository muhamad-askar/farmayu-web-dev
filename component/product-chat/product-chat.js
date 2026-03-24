// Simpan di: ../component/chat/chat-product.js

document.addEventListener("DOMContentLoaded", function() {
    const chatPlaceholder = document.getElementById('chat-product-placeholder');
    const urlParams = new URLSearchParams(window.location.search);

    // Ambil data dari URL (sesuai kiriman dari katalog)
    const pName = urlParams.get('name');
    const pPrice = urlParams.get('price');
    const pImg = urlParams.get('img');

    // JALANKAN HANYA JIKA ADA DATA & PLACEHOLDER
    if (chatPlaceholder && pName) {
        fetch('../component/product-chat/product-chat.html')
            .then(res => res.text())
            .then(html => {
                chatPlaceholder.innerHTML = html;

                // Isi data ke elemen yang baru di-load
                document.getElementById('chat-p-name').innerText = decodeURIComponent(pName).replace(/-/g, ' ');
                document.getElementById('chat-p-price').innerText = `Rp ${pPrice}`;
                document.getElementById('chat-p-img').src = `../asset_foto/alat/${pImg}`;
                
                // Bonus: Otomatis isi pesan di input chat (biar user tinggal pencet kirim)
                const chatInput = document.querySelector('.chat-input-field'); 
                if (chatInput) {
                    chatInput.value = `Halo, saya ingin tanya tentang ${pName.replace(/-/g, ' ')}`;
                }
            })
            .catch(err => console.error("Gagal load info produk di chat:", err));
    }
});