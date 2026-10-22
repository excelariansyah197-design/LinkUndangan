// ===== Pengaturan (ubah sesuai data Anda) =====
const WEDDING_DATE = new Date('2026-12-12T08:00:00+07:00');
const EVENT_TITLE  = 'Pernikahan Rina & Dimas';
const EVENT_PLACE  = 'Masjid Al-Ikhlas, Surabaya';
const STORAGE_KEY  = 'wedding_wishes_v1';

// ===== Helper =====
const $ = (id) => document.getElementById(id);

// ===== 1. Nama tamu dari URL: index.html?to=Budi+Santoso =====
const params = new URLSearchParams(window.location.search);
const guest = params.get('to');
if (guest) $('guestName').textContent = guest;

// ===== 2. Buka undangan =====
const bgm = $('bgm');
const btnMusic = $('btnMusic');

$('btnOpen').addEventListener('click', () => {
  $('cover').classList.add('hide');
  document.body.classList.remove('locked');
  $('bottomNav').classList.remove('d-none');
  btnMusic.classList.remove('d-none');
  window.scrollTo(0, 0);
  playMusic();
  revealOnScroll();
});

// ===== 3. Musik =====
function playMusic() {
  bgm.play().then(() => btnMusic.classList.add('playing')).catch(() => {});
}
btnMusic.addEventListener('click', () => {
  if (bgm.paused) { playMusic(); }
  else { bgm.pause(); btnMusic.classList.remove('playing'); }
});

// ===== 4. Hitung mundur =====
function updateCountdown() {
  const diff = WEDDING_DATE - new Date();
  if (diff <= 0) {
    $('timer').innerHTML = '<p class="fs-4 serif">Hari bahagia telah tiba! 🎉</p>';
    return;
  }
  const s = Math.floor(diff / 1000);
  $('cdDays').textContent  = Math.floor(s / 86400);
  $('cdHours').textContent = Math.floor((s % 86400) / 3600);
  $('cdMins').textContent  = Math.floor((s % 3600) / 60);
  $('cdSecs').textContent  = s % 60;
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ===== 5. Tombol simpan ke Google Calendar =====
(function setupCalendar() {
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const end = new Date(WEDDING_DATE.getTime() + 6 * 3600 * 1000);
  const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + '&text=' + encodeURIComponent(EVENT_TITLE)
    + '&dates=' + fmt(WEDDING_DATE) + '/' + fmt(end)
    + '&location=' + encodeURIComponent(EVENT_PLACE);
  $('btnCalendar').href = url;
})();

// ===== 6. Animasi muncul saat scroll =====
function revealOnScroll() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
}

// ===== 7. RSVP & Ucapan (disimpan di localStorage) =====
function loadWishes() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}
function saveWishes(list) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch {}
}
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function renderWishes() {
  const list = loadWishes();
  $('wishCount').textContent = list.length;
  if (!list.length) {
    $('wishList').innerHTML = '<p class="text-muted">Belum ada ucapan. Jadilah yang pertama!</p>';
    return;
  }
  const color = { 'Hadir': 'success', 'Tidak Hadir': 'danger', 'Masih Ragu': 'warning' };
  $('wishList').innerHTML = list.map((w) => `
    <div class="wish">
      <div class="d-flex justify-content-between align-items-center">
        <strong>${escapeHTML(w.nama)}</strong>
        <span class="badge bg-${color[w.status] || 'secondary'} badge-status">${escapeHTML(w.status)}</span>
      </div>
      <p class="mb-1 mt-1">${escapeHTML(w.ucapan)}</p>
      <small class="text-muted">${escapeHTML(w.waktu)}</small>
    </div>`).join('');
}

$('rsvpForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const nama = $('nama'), status = $('kehadiran'), ucapan = $('ucapan');
  let valid = true;
  [nama, status, ucapan].forEach((el) => {
    const ok = el.value.trim() !== '';
    el.classList.toggle('is-invalid', !ok);
    if (!ok) valid = false;
  });
  if (!valid) return;

  const list = loadWishes();
  list.unshift({
    nama: nama.value.trim(),
    status: status.value,
    ucapan: ucapan.value.trim(),
    waktu: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })
  });
  saveWishes(list);
  renderWishes();
  e.target.reset();
  alert('Terima kasih! Ucapan Anda sudah terkirim 💌');
});
renderWishes();

// ===== 8. Salin nomor rekening =====
$('btnCopy').addEventListener('click', async () => {
  const btn = $('btnCopy');
  try {
    await navigator.clipboard.writeText($('rekening').textContent.trim());
    btn.innerHTML = '<i class="bi bi-check2 me-2"></i>Tersalin!';
  } catch {
    btn.innerHTML = 'Salin manual ya 🙏';
  }
  setTimeout(() => { btn.innerHTML = '<i class="bi bi-clipboard me-2"></i>Salin Nomor Rekening'; }, 2000);
});

// ===== 9. Perbesar foto galeri =====
document.querySelectorAll('.gal').forEach((img) => {
  img.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);z-index:3000;display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:1rem';
    overlay.innerHTML = `<img src="${img.src}" style="max-width:100%;max-height:100%;border-radius:12px">`;
    overlay.addEventListener('click', () => overlay.remove());
    document.body.appendChild(overlay);
  });
});
