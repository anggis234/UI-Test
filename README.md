# SauceDemo UI Automation Testing - Playwright TypeScript

## 📁 Struktur Proyek

```text
testIndico/
├── docs/
│   └── test-plans/          # Dokumen test plan terperinci (plan-FE-*.md)
├── src/
│   ├── fixtures/
│   │   └── base.fixture.ts  # Playwright test extension & dependency injection
│   ├── pages/               # Page Object Model (POM)
│   │   ├── login.page.ts        # Halaman Login
│   │   ├── inventory.page.ts    # Halaman Katalog Produk & Sidebar
│   │   ├── cart.page.ts         # Halaman Keranjang Belanja
│   │   └── checkout.page.ts     # Halaman Checkout (Step 1, Step 2, Complete)
│   ├── test-data/           # Data uji statis & konstanta
│   │   ├── users.data.ts        # Akun pengguna
│   │   └── checkout.data.ts     # Data pembeli & ekspektasi checkout
│   └── utils/
│       └── step-reporter.ts # Custom console reporter untuk test step
├── tests/
│   └── ui/                  # Test specifications (*.spec.ts)
│       ├── login.spec.ts        # Spesifikasi pengujian login & logout
│       └── checkout.spec.ts     # Spesifikasi pengujian checkout flow
├── .env.example             # Contoh template environment variables
├── package.json             # Dependensi proyek & shortcut scripts
└── playwright.config.ts     # Konfigurasi utama Playwright
```

---

## 💻 Prasyarat Sistem

Sebelum memulai, pastikan perangkat Anda telah terpasang:
- **Node.js**: Versi `20.x` atau lebih baru (disarankan LTS `v22.x`)
- **npm**: Versi `10.x` atau lebih baru
- **Git**

Untuk memverifikasi instalasi Node.js dan npm di terminal:
```bash
node -v
npm -v
```

---

## 🚀 Panduan Instalasi & Setup

### 1. Masuk ke Direktori Proyek
Buka terminal dan navigasikan ke root folder proyek:
```bash
cd UI-Test
```

### 2. Pasang Dependensi Node.js
Jalankan perintah berikut untuk mengunduh semua paket dependensi:
```bash
npm install
```

### 3. Pasang Browser Binaries Playwright
Unduh browser engine Chromium yang digunakan untuk pengujian:
```bash
npx playwright install chromium
```
*(Opsional) Jika di sistem operasi Linux membutuhkan system dependencies browser:*
```bash
npx playwright install-deps chromium
```

### 4. Konfigurasi Environment Variable (`.env`)
Salin file konfigurasi contoh `.env.example` menjadi `.env`:
```bash
cp .env.example .env
```
Isi default `.env`:
```properties
BASE_URL=https://www.saucedemo.com
```

---

## 🧪 Cara Menjalankan Test

Proyek menyediakan beberapa mode eksekusi melalui script `npm` maupun CLI Playwright:

### 1. Menjalankan Semua Test (Headless Mode)
Menjalankan seluruh test suite secara *headless* (tanpa membuka jendela browser):
```bash
npx playwright test
```

### 2. Menjalankan Test dengan Browser Terbuka (Headed Mode)
Gunakan mode ini untuk melihat interaksi UI langsung di layar browser:
```bash
npx playwright test --headed
```

## 📊 Membuka dan Melihat Test Report

Setelah pengujian selesai dijalankan, Playwright secara otomatis mengompilasi laporan hasil pengujian interaktif ke folder `playwright-report/`.

### Cara Membuka HTML Report:
Jalankan perintah berikut:
```bash
npx playwright show-report
```

Perintah di atas akan menyajikan laporan melalui web server lokal (biasanya di `http://localhost:9323`).

### Informasi yang Disajikan pada Report:
1. **Status Eksekusi**: Status Pass, Fail, Flaky, atau Skipped beserta durasi eksekusi total.
2. **Granular Steps (`test.step`)**: Pembagian langkah aksi dan verifikasi per test case secara bertahap.
3. **Screenshot on Failure**: Tangkapan layar otomatis jika terdapat langkah yang gagal.
4. **Trace Viewer**: Jejak rekam interaksi DOM, action network, console logs, dan snapshot visual di setiap langkah saat terjadi kegagalan.

*Tekan `Ctrl + C` pada terminal untuk menutup web server report.*