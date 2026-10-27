import { IsNotEmpty, IsString, MaxLength, IsInt, Min, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAssetDto {
  @IsNotEmpty({ message: 'Nama aset tidak boleh kosong' })
  @IsString({ message: 'Nama aset harus berupa teks' })
  @MaxLength(150, { message: 'Nama aset maksimal 150 karakter' })
  asset_name: string;

  @IsNotEmpty({ message: 'Jumlah stok tidak boleh kosong' })
  @Type(() => Number)
  @IsInt({ message: 'Jumlah stok harus berupa angka bulat' })
  @Min(0, { message: 'Jumlah stok minimal 0' })
  stock_quantity: number;

  @IsNotEmpty({ message: 'Kategori tidak boleh kosong' })
  @IsString()
  @IsIn(['Consumable', 'Non-Consumable'], {
    message: 'Kategori harus bernilai "Consumable" atau "Non-Consumable"',
  })
  category: 'Consumable' | 'Non-Consumable';
}
