# 📦 Fumindo Asset Management System

Sistem Manajemen Aset dan Inventaris Fumindo berbasis **Fullstack Web Application** dengan arsitektur decoupled: **NestJS** (Backend REST API), **PostgreSQL** (Database Relasional), dan **Vue.js 3** (Frontend SPA responsif).

Aplikasi ini dirancang untuk mempermudah pencatatan, pemantauan, pengelolaan stok, serta klasifikasi kategori aset (*Consumable* & *Non-Consumable*) secara akurat dan efisien.

---

## 🛠️ Tech Stack

| Layer | Teknologi | Deskripsi |
| :--- | :--- | :--- |
| **Backend** | [NestJS 11](https://nestjs.com/) | Progressive Node.js framework dengan TypeScript |
| **Database** | [PostgreSQL](https://www.postgresql.org/) | Sistem database relasional yang andal |
| **ORM** | [TypeORM](https://typeorm.io/) | Object-Relational Mapping untuk PostgreSQL |
| **Validation** | `class-validator` & `class-transformer` | Validasi skema DTO otomatis pada sisi server |
| **Frontend** | [Vue.js 3](https://vuejs.org/) | Framework JavaScript modern (`<script setup>`, Composition API) |
| **Build Tool** | [Vite](https://vitejs.dev/) | Frontend tooling & dev server berkecepatan tinggi |
| **Styling** | Vanilla CSS | Desain modern, responsif, glassmorphism, dan custom design system |
| **HTTP Client** | [Axios](https://axios-http.com/) | Client HTTP untuk komunikasi Frontend dengan REST API |

---

## ✨ Fitur Utama

- 📊 **Dashboard Metrik Ringkasan**: Menampilkan statistik real-time untuk total jenis aset, total unit stok fisik, jumlah item *Consumable*, dan item *Non-Consumable*.
- 🔍 **Pencarian & Filter Cepat**:
  - Filter teks nama aset secara real-time.
  - Filter spesifik kategori (*Consumable* / *Non-Consumable* / *Semua Kategori*).
  - Tombol segarkan data (*refresh button*) dengan animasi sinkronisasi.
- ➕ **Tambah Aset Baru**: Modal formulir input yang bersih dengan validasi form ketat sebelum pengiriman data.
- ✏️ **Edit & Update Aset**: Pembaruan nama aset, kuantitas stok, dan kategori secara instan.
- 🗑️ **Hapus Data Aset**: Modal dialog konfirmasi yang aman untuk mencegah penghapusan data yang tidak disengaja.
- 🔔 **Toast Notification System**: Umpan balik visual interaktif untuk setiap operasi (sukses, validasi error, atau kegagalan jaringan).
- 🛡️ **Validasi Berlapis**: Validasi input diterapkan pada 3 tingkat: UI form, NestJS DTO Validation Pipes, serta Database Constraint (`CHECK category IN ('Consumable', 'Non-Consumable')`).

---

## 🗄️ Struktur Database (`asset_fumindo`)

### Skema Tabel `asset`
```sql
CREATE TABLE IF NOT EXISTS asset (
    asset_id SERIAL PRIMARY KEY,
    asset_name VARCHAR(150) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(20) NOT NULL CHECK (category IN ('Consumable', 'Non-Consumable'))
);
```

### Penjelasan Kolom:
- `asset_id`: Identifier unik bertipe integer, bertindak sebagai *Primary Key* dengan *Auto Increment* (`SERIAL`).
- `asset_name`: Nama lengkap barang/aset, bertipe `VARCHAR(150)`, wajib diisi (`NOT NULL`).
- `stock_quantity`: Kuantitas fisik stok aset, bertipe `INT`, nilai default `0`.
- `category`: Kategori aset dengan batasan nilai `Consumable` (barang habis pakai) atau `Non-Consumable` (peralatan/aset tetap).

> 💡 *File skrip SQL DDL dan data awal (seed) tersedia di [`backend/database.sql`](backend/database.sql).*

---

## 🔌 Dokumentasi REST API

Semua rute API memiliki prefix `/api` dan mengembalikan respon berformat JSON standar:

```json
{
  "statusCode": 200,
  "message": "Pesan status",
  "data": { ... }
}
```

### Daftar Endpoint:

| Method | Endpoint | Query Param / Body | Deskripsi |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/assets` | `?search=...&category=...` | Mendapatkan seluruh daftar aset (mendukung filter & pencarian) |
| `GET` | `/api/assets/:id` | - | Mendapatkan detail informasi satu aset berdasarkan ID |
| `POST` | `/api/assets` | JSON Body (`CreateAssetDto`) | Menambahkan data aset baru ke sistem |
| `PUT` | `/api/assets/:id` | JSON Body (`UpdateAssetDto`) | Memperbarui informasi aset berdasarkan ID |
| `DELETE` | `/api/assets/:id` | - | Menghapus aset dari sistem berdasarkan ID |

### Contoh Request Body (`POST` / `PUT`):
```json
{
  "asset_name": "Insektisida Aerosol 500ml",
  "stock_quantity": 50,
  "category": "Consumable"
}
```

---

## 📁 Struktur Direktori

```text
fumindo/
├── backend/                  # REST API Backend (NestJS)
│   ├── src/
│   │   ├── assets/
│   │   │   ├── dto/          # Data Transfer Objects (Create & Update validation)
│   │   │   ├── entities/     # TypeORM Asset Entity
│   │   │   ├── assets.controller.ts
│   │   │   ├── assets.module.ts
│   │   │   └── assets.service.ts
│   │   ├── app.module.ts     # Root Module & Database Connection
│   │   └── main.ts           # Bootstrap NestJS & Global Configuration
│   ├── database.sql          # Skrip DDL Database & Seed Data
│   ├── .env.example          # Template konfigurasi environment
│   └── package.json
├── frontend/                 # User Interface (Vue.js 3 + Vite)
│   ├── src/
│   │   ├── components/       # Komponen UI (Navbar, Stats, Modals, Toast)
│   │   │   ├── Navbar.vue
│   │   │   ├── StatsCards.vue
│   │   │   ├── AssetModal.vue
│   │   │   ├── DeleteModal.vue
│   │   │   └── Toast.vue
│   │   ├── services/         # Axios API Client service
│   │   │   └── assetService.js
│   │   ├── App.vue           # Tampilan utama & state management
│   │   ├── style.css         # Styling modern CSS
│   │   └── main.js
│   ├── vite.config.js        # Konfigurasi Vite & API Reverse Proxy
│   └── package.json
├── .gitignore                # Git ignore konfigurasi root
├── package.json              # Monorepo runner scripts
└── README.md                 # Dokumentasi proyek
```

---

## 🚀 Panduan Menjalankan Proyek

### 1. Prasyarat Sistem
- **Node.js**: Versi `>= 18.x`
- **NPM**: Versi `>= 9.x`
- **PostgreSQL**: Versi `>= 13.x` aktif dan berjalan di lokal/cloud

---

### 2. Konfigurasi Database PostgreSQL
1. Buka PostgreSQL (menggunakan pgAdmin, DBeaver, atau terminal `psql`).
2. Buat database baru bernama `asset_fumindo`:
   ```sql
   CREATE DATABASE asset_fumindo;
   ```
3. Eksekusi file SQL [`backend/database.sql`](backend/database.sql) ke dalam database `asset_fumindo` untuk membuat tabel dan data dummy:
   ```bash
   psql -U postgres -d asset_fumindo -f backend/database.sql
   ```

---

### 3. Konfigurasi Backend
1. Masuk ke direktori backend:
   ```bash
   cd backend
   ```
2. Salin file environment:
   ```bash
   cp .env.example .env
   ```
3. Sesuaikan parameter koneksi database di file `.env`:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=password_postgres_anda
   DB_NAME=asset_fumindo
   ```
4. Install dependensi dan jalankan backend:
   ```bash
   npm install
   npm run start:dev
   ```
   Backend aktif di: `http://localhost:3000/api/assets`

---

### 4. Konfigurasi Frontend
1. Buka terminal baru dan masuk ke direktori frontend:
   ```bash
   cd frontend
   ```
2. Install dependensi dan jalankan frontend server:
   ```bash
   npm install
   npm run dev
   ```
3. Buka browser pada alamat:
   ```
   http://localhost:5173/
   ```

---

### 5. Menjalankan Melalui Root Workspace
Dari folder utama (root):
- **Menjalankan Frontend**: `npm run dev` atau `npm run frontend`
- **Menjalankan Backend**: `npm run backend`
- **Build Kedua Project**: `npm run build`

---

## 👤 Pengembang

- **Nama**: Ilfath
- **GitHub**: [@ilfathubyd](https://github.com/ilfathubyd)
- **Repository**: [internship_fumindo](https://github.com/ilfathubyd/internship_fumindo)
