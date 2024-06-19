import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './products.schema';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}

  @ApiOperation({summary: 'Получение всех товаров'})
  @ApiResponse({status: 200, type: [Product]})
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @ApiOperation({summary: 'Получение товара по id'})
  @ApiResponse({status: 200, type: Product})
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product | null> {
    return await this.productsService.findOne(id);
  }

  @ApiOperation({summary: 'Создание нового товара'})
  @ApiResponse({status: 200, type: Product})
  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return await this.productsService.create(product);
  }

  @ApiOperation({summary: 'Изменение товара'})
  @ApiResponse({status: 200, type: Product})
  @Put(':id')
  async update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return await this.productsService.update(id, product);
  }

  @ApiOperation({summary: 'Удаление товара'})
  @ApiResponse({status: 200, type: Product})
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Product> {
    return await this.productsService.delete(id);
  }
}
