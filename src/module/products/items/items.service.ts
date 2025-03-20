import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-product.dto';
import { UpdateItemsDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items } from './entities/items.schema';
import { Model } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { ResponseServiceDto } from 'src/common/response_services.dto';


@Injectable()
export class ItemsService {

  constructor(
    @InjectModel(Items.name) private ItemsModel: Model<Items>
  ){}

  async create(createItemsDto: CreateItemsDto): Promise<ResponseServiceDto> {


    await this.validateBySkuItemExistence(createItemsDto.sku)
    await this.validateByIdItemExistence(createItemsDto.parentId)
    
    const createdItem = new this.ItemsModel(createItemsDto); 

    return {
      status: HttpStatus.CREATED,
      data: await createdItem.save(),
      message: "Item was created ✅"
    }

  }

  async findAll(skip: number, limit: number): Promise<any> {

    const items = await this.ItemsModel
    .find()
    .populate("parentId")
    .skip(skip)
    .limit(limit)
    .lean()
    .exec()

    const countItems = await this.ItemsModel.countDocuments().exec()
    
    return {
      total: countItems,
      status: HttpStatus.CREATED,
      data: items,
      message: "Items were found ✅"
    }
  }

  async findOneById(id: string): Promise<ResponseServiceDto> {

    const item_by_id = await this.ItemsModel
    .findById(id)
    .populate("parentId")
    .exec()

    if (!item_by_id){
      throw new NotFoundException(`Item with the id: ${id} wasnt found`)
    }

    return {
      status: HttpStatus.OK,
      data: item_by_id,
      message:"Item with the ID was found ✅"
    }
  }

  async findBySku(sku: string): Promise<ResponseServiceDto>{

    const item_by_sku = await this.ItemsModel.findOne({sku})
    .populate("parentId")
    .exec()

    if(!item_by_sku){
      throw new NotFoundException(`The item with the sku: ${sku} wasnt found`)
    }

    return {
      status: HttpStatus.OK,
      data: item_by_sku,
      message:"Item with the ID was found ✅"
    }
   }

  async update(id: string, updateItemsDto: UpdateItemsDto): Promise<ResponseServiceDto> {
    
    const item_for_update = await this.ItemsModel.findById(id)

    if (!item_for_update){
      throw new Error(`Item with the id: ${id} wasnt found`)
    }

    Object.assign(item_for_update, updateItemsDto)

    return {
      status: HttpStatus.OK,
      data: await item_for_update.save(),
      message: "Item was updated ✅"
    }

  }
  
  async remove(id: string): Promise<ResponseServiceDto> {

   const item_delete = await this.ItemsModel.findByIdAndDelete(id)

   if (!item_delete){
    throw new NotFoundException(`Item with the id: ${id} wasnt found`)
  }

  return {
    status: HttpStatus.OK,
    data: item_delete,
    message: "Item was deleted ✅"
  }

  }

  async validateBySkuItemExistence(sku: string):Promise<boolean>{

    const product_by_sku = await this.ItemsModel.findOne({sku})

    if(product_by_sku){
      throw new ConflictException(`Product with SKU ${sku} already exists`)
    }

    return true

  }

  async validateByIdItemExistence(parent_id: string):Promise<boolean>{

    if(parent_id){

      const product_by_id = await this.ItemsModel.findById(parent_id)

      if(!product_by_id){
        throw new NotFoundException(`Product with ID ${parent_id} wasnt found for be parent`)
      }

      return true

    } else {

      return true 
    }

    
  }
}
