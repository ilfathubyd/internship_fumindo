import { IsOptional, IsString, MaxLength, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateAssetDto {
  @IsOptional()
  @IsString({ message: 'Nama aset harus berupa teks' })
  @MaxLength(150, { message: 'Nama aset maksimal 150 karakter' })
  asset_name?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Jumlah stok harus berupa angka bulat' })
  @Min(0, { message: 'Jumlah stok minimal 0' })
  stock_quantity?: number;

  @IsOptional()
  @IsString()
  @IsIn(['Consumable', 'Non-Consumable'], {
    message: 'Kategori harus bernilai "Consumable" atau "Non-Consumable"',
  })
  category?: 'Consumable' | 'Non-Consumable';
}
