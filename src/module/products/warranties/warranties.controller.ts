import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WarrantiesService } from './warranties.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { PaginationDto } from 'src/common/pagination_dto';

@Controller('warranties')
export class WarrantiesController {
  constructor(private readonly warrantiesService: WarrantiesService) {}

  @Post("/create")
  create(@Body() createWarrantyDto: CreateWarrantyDto) {
    return this.warrantiesService.create(createWarrantyDto);
  }

  @Get("/all")
  findAll(
    @Query() paginationDto: PaginationDto
  ) {

    return this.warrantiesService.findAll(paginationDto);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.warrantiesService.findOneById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateWarrantyDto: UpdateWarrantyDto) {
    return this.warrantiesService.update(id, updateWarrantyDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.warrantiesService.remove(id);
  }
}
