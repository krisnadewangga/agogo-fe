# agogo-pos-web-app
Sebuah Web Aplikasi POS untuk kebutuhan kasir, pemesanan penjualan roti dan stok produksi roti.

## Menjalankan Project (Vite)

### Prasyarat
- Node.js versi 24.13.0 atau lebih baru
- npm versi terbaru

### Instalasi
```bash
npm install
```

### Development Server
```bash
npm start
```
Server akan berjalan di http://localhost:3000.

### Build Production
```bash
npm run build
```
Output build berada di folder `build/`.

### Preview Build Production
```bash
npm run preview
```
Preview berjalan di http://localhost:4173.

## Environment Variables

Project ini menggunakan environment variable dengan prefix `VITE_`.

Contoh variabel yang dipakai:
- `VITE_SHOP_NAME`
- `VITE_BRANCH_NAME`
- `VITE_RECEIPT_CODE`
- `VITE_BRANCH_ADDRESS`
- `VITE_BRANCH_PHONE`
- `VITE_BRANCH_MAP`

Semua nilai ada di file `.env`.

## Catatan Deploy

- Untuk static hosting, deploy isi folder `build/`.
- Jika server membutuhkan fallback SPA routing, arahkan semua request non-file ke `index.html`.
