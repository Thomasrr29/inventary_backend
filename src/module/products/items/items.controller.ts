import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemsDto } from './dto/create-product.dto';
import { UpdateItemsDto } from './dto/update-product.dto';

@Controller('Items')
export class ItemsController {
  constructor(private readonly productsService: ItemsService) {}

  @Post()
  create(@Body() createProductDto: CreateItemsDto) {
    return this.productsService.create(createProductDto);
  }

  @Get("/all")
  findAll(
    @Query("skip") skip: number = 0,
    @Query("limit") limit: number = 10
  ) {
    return this.productsService.findAll(skip, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateItemsDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
