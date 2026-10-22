// ===================================================
// FITUR 1: Tampilkan nama tamu dari link
// Contoh link: index.html?to=Budi
// ===================================================
const params = new URLSearchParams(window.location.search);
const tamu = params.get("to");
if (tamu) {
  document.getElementById("namaTamu").textContent = tamu;
}

// ===================================================
// FITUR 2: Tombol "Buka Undangan"
// Cover disembunyikan, isi undangan ditampilkan
// ===================================================
document.getElementById("btnBuka").addEventListener("click", function () {
  document.getElementById("cover").classList.add("d-none");
  document.getElementById("isi").classList.remove("d-none");
});

// ===================================================
// FITUR 3: Hitung mundur ke hari pernikahan
// ===================================================
const tanggalNikah = new Date("2026-12-12T08:00:00+07:00");

function hitungMundur() {
  const sekarang = new Date();
  const selisih = tanggalNikah - sekarang; // dalam milidetik

  if (selisih <= 0) return; // acara sudah lewat

  const detik = Math.floor(selisih / 1000);
  document.getElementById("hari").textContent  = Math.floor(detik / 86400);
  document.getElementById("jam").textContent   = Math.floor((detik % 86400) / 3600);
  document.getElementById("menit").textContent = Math.floor((detik % 3600) / 60);
  document.getElementById("detik").textContent = detik % 60;
}

hitungMundur();
setInterval(hitungMundur, 1000); // update setiap 1 detik

// ===================================================
// FITUR 4: Form ucapan
// Ambil isi form lalu tampilkan di bawahnya
// ===================================================
document.getElementById("formUcapan").addEventListener("submit", function (e) {
  e.preventDefault(); // cegah halaman refresh

  const nama  = document.getElementById("nama").value.trim();
  const hadir = document.getElementById("hadir").value;
  const pesan = document.getElementById("pesan").value.trim();

  // Validasi sederhana
  if (nama === "" || pesan === "") {
    alert("Nama dan ucapan wajib diisi!");
    return;
  }

  // Buat kotak ucapan baru
  const kotak = document.createElement("div");
  kotak.className = "ucapan";
  kotak.innerHTML = "<strong></strong> (<em></em>)<p class='mb-0'></p>";
  kotak.querySelector("strong").textContent = nama;
  kotak.querySelector("em").textContent = hadir;
  kotak.querySelector("p").textContent = pesan;

  // Tambahkan ke paling atas daftar
  const daftar = document.getElementById("daftarUcapan");
  daftar.prepend(kotak);

  this.reset(); // kosongkan form
});
