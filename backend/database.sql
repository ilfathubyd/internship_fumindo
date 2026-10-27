-- ========================================================
-- Fumindo Asset Management System - Database Schema & Seed
-- Database Engine: PostgreSQL
-- Database Name: asset_fumindo
-- ========================================================

-- 1. Buat Tabel `asset`
CREATE TABLE IF NOT EXISTS asset (
    asset_id SERIAL PRIMARY KEY,
    asset_name VARCHAR(150) NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0,
    category VARCHAR(20) NOT NULL CHECK (category IN ('Consumable', 'Non-Consumable'))
);

-- 2. Data Awal (Dummy / Seed Data)
INSERT INTO asset (asset_name, stock_quantity, category) VALUES
('Insektisida Cair 1L', 45, 'Consumable'),
('Masker Respirator 3M Full Face', 12, 'Non-Consumable'),
('Umpan Racun Tikus Block 100g', 150, 'Consumable'),
('Mesin Cold Fogger ULV Portable', 6, 'Non-Consumable'),
('Sarung Tangan Nitrile Kimia (Box 100)', 25, 'Consumable'),
('Alat Semprot Manual Knapsack Sprayer 16L', 8, 'Non-Consumable'),
('Gel Umpan Kecoa Syringe 30g', 35, 'Consumable'),
('Baju Pelindung Hazmat Reusable', 14, 'Non-Consumable')
ON CONFLICT DO NOTHING;
