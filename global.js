const isSubFolder = window.location.pathname.includes('/user-page/') || 

                    window.location.pathname.includes('/katalog-page/') || 

                    window.location.pathname.includes('/toko-page/') || 

                    window.location.pathname.includes('/transaksi-page/');
const base = isSubFolder ? ".." : ".";
async function loadLayout() {
  try {
    const navResponse = await fetch(`${base}/navigation.html`);
    let navData = await navResponse.text();
    navData = navData.replace(/src="\//g, `src="${base}/`).replace(/href="\//g, `href="${base}/`);
    const navPlaceholder = document.getElementById("navbar-placeholder");
    if (navPlaceholder) navPlaceholder.innerHTML = navData;
    const footerResponse = await fetch(`${base}/footer.html`);
    let footerData = await footerResponse.text();

    footerData = footerData.replace(/src="\//g, `src="${base}/`).replace(/href="\//g, `href="${base}/`);

    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (footerPlaceholder) footerPlaceholder.innerHTML = footerData;
    initSearch();
    updateProfileLink();
  } catch (error) {

    console.error("Gagal memuat layout:", error);

  }

}
function updateProfileLink() {

  const sesiAktif = localStorage.getItem("sesiInTani");

  const linkProfil = document.querySelector('.nav-icons a[href*="login.html"]');
  if (linkProfil && sesiAktif) {

    linkProfil.href = `${base}/user-page/user.html`;

  }

}
function initSearch() {

  const inputSearch = document.getElementById("input-search");

  if (!inputSearch) return;
  let dropdownSaran = document.getElementById("dropdown-saran");

  if (!dropdownSaran) {

    dropdownSaran = document.createElement("div");

    dropdownSaran.id = "dropdown-saran";

    document.body.appendChild(dropdownSaran);

  }
  const dataKatalog = [

    { nama: "Benih Tomat Super", link: `${base}/katalog-page/katalog_benih.html` },

    { nama: "Benih Cabai Rawit", link: `${base}/katalog-page/katalog_benih.html` },

    { nama: "Pupuk Kompos Organik", link: `${base}/katalog-page/katalog_pupuk.html` },

    { nama: "Cangkul Baja", link: `${base}/katalog-page/katalog_alat-pertanian.html` },

    { nama: "Pestisida Alami", link: `${base}/katalog-page/katalog_pupuk.html` },

    { nama: "Bibit Padi Unggul", link: `${base}/katalog-page/katalog_benih.html` },

    { nama: "Selang Air Irigasi", link: `${base}/katalog-page/katalog_alat-pertanian.html` },

    { nama: "Traktor Mini", link: `${base}/katalog-page/katalog_alat-pertanian.html` },

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

      const hasilFilter = dataKatalog.filter(

        (item) => item.nama.toLowerCase().includes(teks),
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

        const produkDitemukan = dataKatalog.find(

          (p) => p.nama.toLowerCase() === teks,

        );
        if (produkDitemukan) {
          window.location.href = produkDitemukan.link;
        } else {
          window.location.href = `${base}/katalog-page/katalog_pupuk.html?cari=${encodeURIComponent(teks)}`;
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
