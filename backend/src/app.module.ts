import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './assets/entities/asset.entity.js';
import { AssetsModule } from './assets/assets.module.js';

@Module({
  imports: [
    // Membaca file .env untuk konfigurasi environment
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Koneksi ke Database PostgreSQL (asset_fumindo)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD ?? '',
      database: process.env.DB_NAME || 'asset_fumindo',
      entities: [Asset],
      synchronize: false, // Tabel sudah dibuat sebelumnya di PostgreSQL
    }),

    // Module CRUD Asset
    AssetsModule,
  ],
})
export class AppModule {}
