# Panduan Deploy — GitHub & Cloudflare Workers (Next.js)

> Catatan: project Cloudflare kamu dibuat sebagai **Workers** (native Next.js support),
> BUKAN Cloudflare Pages. Cloudflare mendeteksi ini otomatis lewat "Connect to Git" dan
> menjalankan `npm run build` lalu `npx wrangler deploy`. Panduan ini disesuaikan dengan
> jalur tersebut.

## 1. Push ke GitHub

```bash
git add -A
git commit -m "pesan commit"
git push
```

(Kalau repo belum pernah dihubungkan ke GitHub sama sekali, lihat bagian bawah file ini.)

## 2. Konfigurasi di Cloudflare Dashboard

Project Workers kamu (mis. `website-puskesmas-lambuya`) di **Workers & Pages > Compute
(Workers)**, sudah terhubung ke repo GitHub. Cloudflare otomatis:
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Framework: Next.js (dideteksi otomatis)

### Environment Variables (WAJIB)
Buka project > **Settings > Variables and Secrets**, tambahkan untuk **Production**:

| Nama | Nilai |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL project Supabase kamu |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key Supabase kamu |
| `NEXT_PUBLIC_SITE_URL` | URL domain akhir, mis. `https://website-puskesmas-lambuya.<subdomain>.workers.dev` |

### Compatibility flags (WAJIB)
`wrangler.toml` di proyek ini sudah berisi `compatibility_flags = ["nodejs_compat"]`
(dibutuhkan oleh Supabase client). Kalau dashboard Cloudflay masih menampilkan error terkait
Node API, cek juga di **Settings > Runtime** apakah flag `nodejs_compat` sudah aktif —
kalau ada opsi untuk menambahkannya manual, tambahkan di sana juga.

## 3. Redeploy

Setiap `git push` ke branch `main` akan otomatis memicu build & deploy baru. Bisa juga
dipicu manual lewat tab **Deployments > Create deployment**.

## 4. Setelah live

- Buka `https://<worker-name>.<subdomain>.workers.dev` — situs publik harus tampil normal.
- Buka `.../admin/login` — login pakai akun admin Supabase yang sudah kamu buat.
- Kalau punya domain sendiri, tambahkan di **Settings > Domains & Routes**.

## Build & jalankan lokal (opsional, untuk uji coba sebelum push)

```bash
npm install
npm run build      # build Next.js standar
npm run preview    # simulasikan lewat Wrangler (butuh koneksi ke akun Cloudflare)
```

## Menghubungkan repo lokal ke GitHub (kalau belum pernah)

```bash
git remote add origin https://github.com/USERNAME/NAMA-REPO.git
git branch -M main
git push -u origin main
```
Ganti `USERNAME` dan `NAMA-REPO` sesuai repo GitHub kamu. Kalau diminta login, gunakan
Personal Access Token (GitHub > Settings > Developer settings > Personal access tokens),
bukan password akun.

## Troubleshooting umum

- **"It looks like you've run a Workers-specific command in a Pages project"** — berarti
  `wrangler.toml` berisi `pages_build_output_dir`. Untuk project Workers native, JANGAN
  ada baris itu di `wrangler.toml` (sudah dihapus di versi proyek ini).
- **"The version of Next.js ... cannot be automatically configured"** — Next.js harus
  >= 14.2.35. Cek `package.json`.
- **Error terkait Node API / module tidak ditemukan** — pastikan `nodejs_compat` aktif
  (lihat bagian Compatibility flags di atas).
- **`git push` ditolak (non-fast-forward)** — riwayat lokal dan remote tidak nyambung.
  Jalankan `git fetch origin` lalu `git reset --soft origin/main`, commit ulang
  perubahanmu, baru `git push` lagi (file lokal tidak akan hilang).
