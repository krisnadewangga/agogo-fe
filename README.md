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
Contoh variabel yang dipakai:
- `SHOP_NAME`
- `BRANCH_NAME`
- `RECEIPT_CODE`
- `BRANCH_ADDRESS`
- `BRANCH_PHONE`
- `BRANCH_MAP`

Semua nilai ada di file `.env`.

## Catatan Deploy

- Untuk static hosting, deploy isi folder `build/`.
- Jika server membutuhkan fallback SPA routing, arahkan semua request non-file ke `index.html`.
