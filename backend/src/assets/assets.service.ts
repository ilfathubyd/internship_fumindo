import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Asset } from './entities/asset.entity.js';
import { CreateAssetDto } from './dto/create-asset.dto.js';
import { UpdateAssetDto } from './dto/update-asset.dto.js';

@Injectable()
export class AssetsService {
  constructor(
    @InjectRepository(Asset)
    private readonly assetRepository: Repository<Asset>,
  ) {}

  // 1. Ambil semua data aset (bisa filter pencarian nama & kategori)
  async findAll(search?: string, category?: string): Promise<Asset[]> {
    const whereCondition: any = {};

    if (search && search.trim() !== '') {
      whereCondition.asset_name = ILike(`%${search.trim()}%`);
    }

    if (category && (category === 'Consumable' || category === 'Non-Consumable')) {
      whereCondition.category = category;
    }

    return await this.assetRepository.find({
      where: Object.keys(whereCondition).length > 0 ? whereCondition : undefined,
      order: { asset_id: 'ASC' },
    });
  }

  // 2. Ambil satu data aset berdasarkan ID
  async findOne(id: number): Promise<Asset> {
    const asset = await this.assetRepository.findOne({
      where: { asset_id: id },
    });

    if (!asset) {
      throw new NotFoundException(`Aset dengan ID ${id} tidak ditemukan`);
    }

    return asset;
  }

  // 3. Tambah data aset baru
  async create(createAssetDto: CreateAssetDto): Promise<Asset> {
    const newAsset = this.assetRepository.create(createAssetDto);
    return await this.assetRepository.save(newAsset);
  }

  // 4. Perbarui data aset berdasarkan ID
  async update(id: number, updateAssetDto: UpdateAssetDto): Promise<Asset> {
    const asset = await this.findOne(id); // Pastikan data ada dulu
    Object.assign(asset, updateAssetDto);
    return await this.assetRepository.save(asset);
  }

  // 5. Hapus data aset berdasarkan ID
  async remove(id: number): Promise<{ message: string; deleted_id: number }> {
    const asset = await this.findOne(id); // Pastikan data ada dulu
    await this.assetRepository.remove(asset);
    return {
      message: `Aset dengan ID ${id} (${asset.asset_name}) berhasil dihapus`,
      deleted_id: id,
    };
  }
}
