document.addEventListener("DOMContentLoaded", function() {
    const chatPlaceholder = document.getElementById('chat-product-placeholder');
    const urlParams = new URLSearchParams(window.location.search);

    //data url
    const pName = urlParams.get('name');
    const pImg = urlParams.get('img');

    if (chatPlaceholder && pName) {
        fetch('../component/chat-preview/chat-preview.html')
            .then(res => res.text())
            .then(html => {
                chatPlaceholder.innerHTML = html;
                document.getElementById('chat-p-name').innerText = decodeURIComponent(pName).replace(/-/g, ' ');
                document.getElementById('chat-p-img').src = `../asset_foto/alat/${pImg}`;

            })
    }
});