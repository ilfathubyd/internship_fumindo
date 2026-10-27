# 🚀 Backend - Fumindo Asset Management System

REST API service untuk Sistem Manajemen Aset Fumindo yang dibangun menggunakan **NestJS**, **TypeORM**, dan **PostgreSQL**.

## 📌 Fitur Backend
- RESTful API CRUD untuk data aset.
- Validasi data otomatis menggunakan DTO (`class-validator`).
- TypeORM integration dengan PostgreSQL driver.
- Global API prefix `/api`.
- CORS diaktifkan untuk akses frontend.

## 🛠️ Setup & Development

```bash
# 1. Install dependencies
npm install

# 2. Setup environment (.env)
cp .env.example .env

# 3. Jalankan server mode development
npm run start:dev

# 4. Build untuk production
npm run build
```

Detail dokumentasi lengkap tersedia di [Root README](../README.md).
