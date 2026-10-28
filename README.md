# SauceDemo UI Automation Testing - Playwright TypeScript

Repositori ini berisi rangkaian pengujian otomatis (*Automated UI Testing*) berbasis **Playwright** dan **TypeScript** untuk aplikasi web [SauceDemo](https://www.saucedemo.com). Proyek ini dibangun mengikuti standar arsitektur industri QA: **Page Object Model (POM)** terpadu, **Custom Fixtures (Dependency Injection)**, serta reporting terperinci via `test.step()`.

---

## 📋 Daftar Isi
1. [Fitur & Skenario Pengujian](#-fitur--skenario-pengujian)
2. [Struktur Proyek](#-struktur-proyek)
3. [Prasyarat Sistem](#-prasyarat-sistem)
4. [Panduan Instalasi & Setup](#-panduan-instalasi--setup)
5. [Cara Menjalankan Test](#-cara-menjalankan-test)
6. [Membuka dan Melihat Test Report](#-membuka-dan-melihat-test-report)
7. [Arsitektur & Standar Koding](#-arsitektur--standar-koding)

---

## 🎯 Fitur & Skenario Pengujian

Pengujian mencakup alur utama (*happy path*) sesuai instruksi take-home test serta skenario validasi negatif:

| TC ID | Fitur | Skenario Pengujian | Tipe | Tags |
| :--- | :--- | :--- | :--- | :--- |
| **FE-01** | `Login` | Login berhasil dengan kredensial valid (`standard_user`) | Positive / Smoke | `@FE-01`, `@Login`, `@High`, `@regression` |
| **FE-02** | `Login` | Validasi error login akun terkunci (`locked_out_user`) | Negative | `@FE-02`, `@Login`, `@Medium`, `@negative`, `@regression` |
| **FE-03** | `Login` | Validasi error login dengan password yang salah | Negative | `@FE-03`, `@Login`, `@Medium`, `@negative`, `@regression` |
| **FE-04** | `Login` | Validasi error submit login form kosong | Negative | `@FE-04`, `@Login`, `@Low`, `@negative`, `@regression` |
| **FE-05** | `Checkout` | **E2E Checkout Flow**: Tambah *'Sauce Labs Onesie'* ke cart, lengkapi data pembeli, tinjau overview, hingga pesanan terkonfirmasi selesai | Positive / E2E | `@FE-05`, `@Checkout`, `@High`, `@regression` |
| **FE-06** | `Checkout` | Validasi pesan error saat data informasi checkout kosong | Negative | `@FE-06`, `@Checkout`, `@Medium`, `@regression` |
| **FE-08** | `Authentication`| Logout dari aplikasi melalui burger menu | Positive | `@FE-08`, `@Authentication`, `@Low`, `@regression` |

---

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
cd testIndico
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
npm test
```
*atau:*
```bash
npx playwright test
```

### 2. Menjalankan Test dengan Browser Terbuka (Headed Mode)
Gunakan mode ini untuk melihat interaksi UI langsung di layar browser:
```bash
npm run test:headed
```
*atau:*
```bash
npx playwright test --headed
```

### 3. Menjalankan Interactive Playwright UI Mode
Membuka antarmuka grafis Playwright (UI Runner) yang memungkinkan time-travel debugging, inspect locators, dan watch mode:
```bash
npm run test:ui
```

---

### 4. Menjalankan Test Spesifik Berdasarkan File

- **Hanya test Login & Logout:**
  ```bash
  npx playwright test tests/ui/login.spec.ts
  ```

- **Hanya test Checkout Flow (E2E):**
  ```bash
  npx playwright test tests/ui/checkout.spec.ts
  ```

---

### 5. Menjalankan Test Berdasarkan Tag `@tag`

Playwright mendukung eksekusi terarah menggunakan filter opsi `-g` / `--grep`:

- **Menjalankan Skenario E2E Checkout Flow (`@FE-05`):**
  ```bash
  npx playwright test -g "@FE-05"
  ```

- **Menjalankan Semua Skenario Checkout:**
  ```bash
  npx playwright test -g "@Checkout"
  ```

- **Menjalankan Semua Skenario Login:**
  ```bash
  npx playwright test -g "@Login"
  ```

- **Menjalankan Seluruh Paket Regression:**
  ```bash
  npx playwright test -g "@regression"
  ```

---

## 📊 Membuka dan Melihat Test Report

Setelah pengujian selesai dijalankan, Playwright secara otomatis mengompilasi laporan hasil pengujian interaktif ke folder `playwright-report/`.

### Cara Membuka HTML Report:
Jalankan perintah berikut:
```bash
npm run test:report
```
*atau:*
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

---

## 🏗️ Arsitektur & Standar Koding

- **Page Object Model (POM)**:
  - Seluruh locator didefinisikan secara encapsulated sebagai `readonly Locator` di konstruktor kelas.
  - Memprioritaskan **Accessibility-First Locators**: `getByRole()`, `getByPlaceholder()`, `getByText()`.
- **Custom Fixtures (`base.fixture.ts`)**:
  - Mengeliminasi boilerplate `new Page(page)` di test spec.
  - Menggunakan *Dependency Injection* sehingga page object diinisialisasi sesuai kebutuhan (*lazy initialization*).
- **Web-First Auto-Retrying Assertions**:
  - Selalu menggunakan asersi asinkronus (`await expect(locator).toBeVisible()`, `await expect(page).toHaveURL(...)`).
  - Menghindari delay statis / hardcoded sleep (`waitForTimeout`).
- **Reporting Terstruktur**:
  - Setiap aksi dan checkpoint dibungkus dalam blok `await test.step(...)` agar report mudah dibaca oleh engineer maupun stakeholder non-teknis.
