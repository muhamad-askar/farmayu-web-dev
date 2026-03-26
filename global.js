async function loadLayout() {
  try {
    const navResponse = await fetch("/navigation.html");
    const navData = await navResponse.text();
    const navPlaceholder = document.getElementById("navbar-placeholder");
    if (navPlaceholder) navPlaceholder.innerHTML = navData;

    const footerResponse = await fetch("/footer.html");
    const footerData = await footerResponse.text();
    const footerPlaceholder = document.getElementById("footer-placeholder");
    if (footerPlaceholder) footerPlaceholder.innerHTML = footerData;

    initSearch();
  } catch (error) {
    console.error("Gagal memuat layout:", error);
  }
}

function initSearch() {
  const inputSearch = document.getElementById("input-search");
  if (!inputSearch) return;

  const dropdownSaran = document.createElement("div");
  dropdownSaran.id = "dropdown-saran";
  document.body.appendChild(dropdownSaran);

  const dataKatalog = [
    { nama: "Benih Tomat Super", link: "/katalog-page/katalog_benih.html" },
    { nama: "Benih Cabai Rawit", link: "/katalog-page/katalog_benih.html" },
    { nama: "Pupuk Kompos Organik", link: "/katalog-page/katalog_pupuk.html" },
    { nama: "Cangkul Baja", link: "/katalog-page/katalog_alat.html" },
    { nama: "Pestisida Alami", link: "/katalog-page/katalog_pupuk.html" },
    { nama: "Bibit Padi Unggul", link: "/katalog-page/katalog_benih.html" },
    { nama: "Selang Air Irigasi", link: "/katalog-page/katalog_alat.html" },
    { nama: "Traktor Mini", link: "/katalog-page/katalog_alat.html" }
  ];

  function updatePosisiDropdown() {
    const rect = inputSearch.getBoundingClientRect();
    dropdownSaran.style.top = rect.bottom + window.scrollY + "px";
    dropdownSaran.style.left = rect.left + window.scrollX + "px";
    dropdownSaran.style.width = rect.width + "px";
  }

  inputSearch.addEventListener("input", function () {
    const teks = this.value.toLowerCase();
    dropdownSaran.innerHTML = "";

    if (teks.length > 0) {
      const hasilFilter = dataKatalog.filter((item) =>
        item.nama.toLowerCase().startsWith(teks)
      );
      if (hasilFilter.length > 0) {
        updatePosisiDropdown();
        dropdownSaran.style.display = "block";
        hasilFilter.forEach((item) => {
          const divItem = document.createElement("div");
          divItem.classList.add("item-saran");
          divItem.innerText = item.nama;
          
          divItem.addEventListener("click", function () {
            inputSearch.value = item.nama;
            dropdownSaran.style.display = "none";
            window.location.href = item.link; 
          });
          
          dropdownSaran.appendChild(divItem);
        });
      } else {
        dropdownSaran.style.display = "none";
      }
    } else {
      dropdownSaran.style.display = "none";
    }
  });

  inputSearch.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      const teks = this.value.trim().toLowerCase();
      
      if (teks.length > 0) {
        dropdownSaran.style.display = "none";
        const produkDitemukan = dataKatalog.find(p => p.nama.toLowerCase() === teks);
        
        if (produkDitemukan) {
          window.location.href = produkDitemukan.link;
        } else {
          window.location.href = `/katalog-page/katalog_pupuk.html?cari=${encodeURIComponent(teks)}`;
        }
      }
    }
  });

  document.addEventListener("click", function (e) {
    if (!inputSearch.contains(e.target) && !dropdownSaran.contains(e.target)) {
      dropdownSaran.style.display = "none";
    }
  });

  window.addEventListener("resize", () => {
    if (dropdownSaran.style.display === "block") updatePosisiDropdown();
  });
}

document.addEventListener("DOMContentLoaded", loadLayout);

<<<<<<< HEAD
=======

>>>>>>> a5ed17d49baddba86bb6827a87a37d27b7d4d7f1
setTimeout(() => {
   
    const linkProfil = document.querySelector('.nav-icons a[href*="login.html"]');
    
   
    const sesiAktif = localStorage.getItem("sesiInTani");

    if (linkProfil && sesiAktif) {
      
        linkProfil.href = "/user-page/user.html";
        
       
    }
}, 500);