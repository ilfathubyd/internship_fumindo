import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AssetsService } from './assets.service.js';
import { CreateAssetDto } from './dto/create-asset.dto.js';
import { UpdateAssetDto } from './dto/update-asset.dto.js';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  // GET /assets atau /assets?search=laptop&category=Non-Consumable
  @Get()
  async findAll(
    @Query('search') search?: string,
    @Query('category') category?: string,
  ) {
    const data = await this.assetsService.findAll(search, category);
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil daftar aset',
      data,
    };
  }

  // GET /assets/:id
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const data = await this.assetsService.findOne(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Berhasil mengambil detail aset',
      data,
    };
  }

  // POST /assets
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAssetDto: CreateAssetDto) {
    const data = await this.assetsService.create(createAssetDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Aset baru berhasil ditambahkan',
      data,
    };
  }

  // PUT /assets/:id
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAssetDto: UpdateAssetDto,
  ) {
    const data = await this.assetsService.update(id, updateAssetDto);
    return {
      statusCode: HttpStatus.OK,
      message: 'Data aset berhasil diperbarui',
      data,
    };
  }

  // DELETE /assets/:id
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.assetsService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: result.message,
      data: { deleted_id: result.deleted_id },
    };
  }
}
