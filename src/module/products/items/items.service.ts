import { Injectable } from '@nestjs/common';
import { CreateItemsDto } from './dto/create-product.dto';
import { UpdateItemsDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Items } from './entities/items.schema';
import { Model } from 'mongoose';
import { HttpStatus } from '@nestjs/common';
import { databaseProviders } from 'src/persistence/database.providers';
import { count } from 'console';



@Injectable()
export class ItemsService {

  constructor(
    @InjectModel(Items.name) private ItemsModel: Model<Items>
  ){}

  async create(createItemsDto: CreateItemsDto): Promise<Object> {
    
    const createdItem = new this.ItemsModel(createItemsDto); 

    return {
      status: HttpStatus.CREATED,
      data: await createdItem.save(),
      message: "Item was created ✅"
    }

  }

  async findAll(skip: number, limit: number): Promise<Object> {

    const items = await this.ItemsModel
    .find()
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

  async findOne(id: string): Promise<Object> {

    const item_by_id = await this.ItemsModel.findById(id).exec()

    if (!item_by_id){
      throw new Error(`Item with the id: ${id} wasnt found`)
    }

    return {
      status: HttpStatus.OK,
      data: item_by_id,
      message:"Item with the ID was found ✅"
    }
  }

  async update(id: string, updateItemsDto: UpdateItemsDto): Promise<Object> {
    
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

  async remove(id: string): Promise<Object> {

   const item_delete = await this.ItemsModel.findByIdAndDelete(id)

   if (!item_delete){
    throw new Error(`Item with the id: ${id} wasnt found`)
  }

  return {
    status: HttpStatus.OK,
    data: item_delete,
    message: "Item was deleted ✅"
  }

  }
}
