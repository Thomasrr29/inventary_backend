import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Warranty } from './entities/warranty.entity';
import { Model } from 'mongoose';
import { PaginationDto } from 'src/common/pagination_dto';
import { ResponseServiceDto } from 'src/common/response_services.dto';

@Injectable()
export class WarrantiesService {
  
  constructor(@InjectModel(Warranty.name) private WarrantyModel: Model<Warranty>) {}
  
  async create(createWarrantyDto: CreateWarrantyDto): Promise<Object>{

    const createdWarranty = new this.WarrantyModel(createWarrantyDto); 

    return {
      status: HttpStatus.CREATED,
      data: await createdWarranty.save(),
      message: "Warranty was created ✅"
    }
    
  }

  async findAll(paginationDto: PaginationDto): Promise<any>{

    const {skip, limit} = paginationDto

    const warranties = await this.WarrantyModel
    .find()
    .populate("productId")
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()

    const countWarranties = await this.WarrantyModel.countDocuments().exec()

    return {
      total: countWarranties,
      status: HttpStatus.OK,
      data: warranties,
      message: "Warranties were found ✅"
    }
    
  }

  async findOneById(id: string): Promise<ResponseServiceDto> {

    const warranty_by_id = await this.WarrantyModel
    .findById(id)
    .populate("productId")
    .exec()

    if (!warranty_by_id){
      throw new NotFoundException("Warranty with the id: ${id} wasnt found")
    }

    return {
      status: HttpStatus.OK,
      data: warranty_by_id,
      message: "Warranty was found ✅"
    }
    
  }

  async update(id: string, updateWarrantyDto: UpdateWarrantyDto): Promise<ResponseServiceDto> {

    const warranty_for_update = await this.WarrantyModel.findById(id)

    if (!warranty_for_update){
      throw new Error("Warranty with the id: ${id} wasnt found")
    }

    Object.assign(warranty_for_update, updateWarrantyDto)

    return {
      status: HttpStatus.OK,
      data: await warranty_for_update.save(),
      message: "The warranty was updated sucessfully ✅"
    }

    
  }

  async remove(id: string): Promise<any> {
    
    const warranty_for_delete = await this.WarrantyModel.findByIdAndDelete(id)

    if (!warranty_for_delete){
      throw new NotFoundException(`The warranty for delete wasn't found with the id: ${id}`)
    }

    return {
      status: HttpStatus.OK,
      data: warranty_for_delete,
      message: `The warranty was removed sucessfully ✅`
    }


  }
  
}
