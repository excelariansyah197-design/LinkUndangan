// Fungsi pendek untuk mengambil elemen berdasarkan id
const $ = (id) => document.getElementById(id);

// ===================================================
// FITUR 1: Nama tamu dari link
// Contoh: index.html?to=Budi  -> tampil "Budi"
// ===================================================
const params = new URLSearchParams(window.location.search);
const tamu = params.get("to");
if (tamu) $("namaTamu").textContent = tamu;

// ===================================================
// FITUR 2: Buka undangan + putar musik
// ===================================================
const musik = $("musik");
const btnMusik = $("btnMusik");

$("btnBuka").addEventListener("click", function () {
  $("cover").classList.add("d-none");        // sembunyikan cover
  $("isi").classList.remove("d-none");       // tampilkan isi
  $("navBawah").classList.remove("d-none");  // tampilkan navigasi
  btnMusik.classList.remove("d-none");       // tampilkan tombol musik
  window.scrollTo(0, 0);

  musik.play().then(() => btnMusik.classList.add("putar")).catch(() => {});
  aktifkanAnimasi();
});

// Tombol musik: putar / jeda
btnMusik.addEventListener("click", function () {
  if (musik.paused) {
    musik.play();
    btnMusik.classList.add("putar");
  } else {
    musik.pause();
    btnMusik.classList.remove("putar");
  }
});

// ===================================================
// FITUR 3: Hitung mundur ke hari pernikahan
// ===================================================
const tanggalNikah = new Date("2026-12-12T08:00:00+07:00");

function hitungMundur() {
  const selisih = tanggalNikah - new Date(); // milidetik
  if (selisih <= 0) return;

  const detik = Math.floor(selisih / 1000);
  $("hari").textContent  = Math.floor(detik / 86400);
  $("jam").textContent   = Math.floor((detik % 86400) / 3600);
  $("menit").textContent = Math.floor((detik % 3600) / 60);
  $("detik").textContent = detik % 60;
}
hitungMundur();
setInterval(hitungMundur, 1000); // jalankan tiap 1 detik

// ===================================================
// FITUR 4: Galeri - klik foto, tampil di modal Bootstrap
// ===================================================
const modalFoto = new bootstrap.Modal($("modalFoto"));

document.querySelectorAll(".gal").forEach(function (foto) {
  foto.addEventListener("click", function () {
    $("fotoBesar").src = foto.src;
    modalFoto.show();
  });
});

// ===================================================
// FITUR 5: Form ucapan (validasi + simpan di localStorage)
// ===================================================
const KUNCI = "ucapan_undangan";

function ambilUcapan() {
  return JSON.parse(localStorage.getItem(KUNCI)) || [];
}

function tampilkanUcapan() {
  const data = ambilUcapan();
  $("jumlahUcapan").textContent = data.length;
  $("daftarUcapan").innerHTML = "";

  data.forEach(function (u) {
    const kotak = document.createElement("div");
    kotak.className = "ucapan";
    kotak.innerHTML = "<strong></strong> <small class='text-muted'></small><p class='mb-0'></p>";
    kotak.querySelector("strong").textContent = u.nama;
    kotak.querySelector("small").textContent = "(" + u.hadir + ")";
    kotak.querySelector("p").textContent = u.pesan;
    $("daftarUcapan").appendChild(kotak);
  });
}

$("formUcapan").addEventListener("submit", function (e) {
  e.preventDefault(); // cegah halaman refresh

  const nama  = $("nama");
  const pesan = $("pesan");

  // Validasi: tidak boleh kosong (class is-invalid dari Bootstrap)
  nama.classList.toggle("is-invalid", nama.value.trim() === "");
  pesan.classList.toggle("is-invalid", pesan.value.trim() === "");
  if (nama.value.trim() === "" || pesan.value.trim() === "") return;

  // Simpan ucapan baru di urutan paling atas
  const data = ambilUcapan();
  data.unshift({
    nama: nama.value.trim(),
    hadir: $("hadir").value,
    pesan: pesan.value.trim()
  });
  localStorage.setItem(KUNCI, JSON.stringify(data));

  tampilkanUcapan();
  this.reset();
});

tampilkanUcapan(); // tampilkan ucapan yang sudah tersimpan

// ===================================================
// FITUR 6: Salin nomor rekening
// ===================================================
$("btnSalin").addEventListener("click", function () {
  navigator.clipboard.writeText($("rekening").textContent.trim());
  const tombol = this;
  tombol.textContent = "Tersalin ✓";
  setTimeout(function () {
    tombol.innerHTML = '<i class="bi bi-clipboard me-2"></i>Salin Nomor Rekening';
  }, 2000);
});

// ===================================================
// FITUR 7: Animasi muncul saat di-scroll
// ===================================================
function aktifkanAnimasi() {
  const pengamat = new IntersectionObserver(function (daftar) {
    daftar.forEach(function (item) {
      if (item.isIntersecting) item.target.classList.add("tampil");
    });
  }, { threshold: 0.15 });

  document.querySelectorAll(".muncul").forEach(function (el) {
    pengamat.observe(el);
  });
}
