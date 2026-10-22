# Undangan Pernikahan Digital — Rina & Dimas

Tugas PBP Minggu 6 (HTML, CSS, Bootstrap, JavaScript).

## Fitur
- Cover "Buka Undangan" dengan nama tamu otomatis (`index.html?to=Budi+Santoso`)
- Hitung mundur hari H (JavaScript)
- Info mempelai, rangkaian acara, tombol Google Maps & simpan ke Google Calendar
- Galeri foto dengan zoom
- RSVP & ucapan tamu (validasi form, tersimpan di localStorage)
- Salin nomor rekening, musik latar, animasi scroll, responsif (Bootstrap 5)

## Cara menyesuaikan
- Nama, orang tua, lokasi, rekening: edit `index.html`
- Tanggal & judul acara: edit konstanta di bagian atas `script.js`
- Foto: ganti URL `picsum.photos` dengan foto Anda di folder `assets/`
- Musik: taruh file di `assets/musik.mp3`

## Upload ke GitHub + GitHub Pages
```bash
git init
git add .
git commit -m "Undangan pernikahan digital"
git branch -M main
git remote add origin https://github.com/USERNAME/undangan-digital.git
git push -u origin main
```
Lalu di repo: **Settings → Pages → Branch: main / (root) → Save**.
Link undangan: `https://USERNAME.github.io/undangan-digital/`

## Outline presentasi 15 menit
1. (1 mnt) Pembuka & tujuan
2. (2 mnt) Konsep desain: warna, font, alur halaman
3. (3 mnt) Demo tampilan (desktop & HP)
4. (5 mnt) Penjelasan kode: struktur HTML, Bootstrap grid/card/form, CSS custom, JS (countdown, localStorage, IntersectionObserver)
5. (2 mnt) Kendala & solusi
6. (2 mnt) Penutup & tanya jawab
