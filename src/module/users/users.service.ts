import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/pagination_dto';
import * as bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { ResponseServiceDto } from 'src/common/response_services.dto';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>){}


  async create(createUserDto: CreateUserDto): Promise<ResponseServiceDto> {

    const user_existence = await this.UserModel.findOne({name: createUserDto.username})

    if (user_existence){
      throw new Error(`The user with the name ${createUserDto.username} already exists`)
    }

    const userForCreate: CreateUserDto = {
        ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10)
    }

    const userCreated = await this.UserModel.create(userForCreate)

    return {
      status: HttpStatus.CREATED,
      data: await userCreated.save(),
      message: `The user ${createUserDto.username} was created sucesfully `
    }


  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<ResponseServiceDto> {

    const {skip, limit} = paginationDto

    const users = await this.UserModel
    .find()
    .select("-password")
    .skip(skip)
    .limit(limit)
    .exec()

    return {
      status: HttpStatus.OK,
      data: users,
      message: "Users found sucessfully"
    }
  }

  async findByName(name: string): Promise<ResponseServiceDto>{

      const user = await this.UserModel.findOne({name})

      if (!user){
        throw new NotFoundException(`User with the name: ${name} wasn't found`)
      }

      return {
        status: HttpStatus.OK,
        data: user,
        message: `User with the name: ${name} was found`
      }
  

  }

  async findOneById(id: string): Promise<ResponseServiceDto> {
  
    const user_by_id = await this.UserModel
    .findById(id)
    .select("-password")
    .exec()

    if (!user_by_id){
      throw new NotFoundException(`User with the ID: ${id} wasn't found`)
    }

    return {
      status: HttpStatus.OK,
      data: user_by_id,
      message: `User with the id: ${id} was found`
    }

  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<ResponseServiceDto> {

    const user_for_update = await this.UserModel.findById(id)

    if (!user_for_update){
      throw new Error(`The user with the ${id} wasn't found`)
    }

    Object.assign(user_for_update, updateUserDto)

    return {
      status: HttpStatus.OK,
      data: await user_for_update.save(),
      message: `The user ${id} was updated sucesfully`
    }

    
  }

  async remove(id: string): Promise<ResponseServiceDto> {
    
    const user_deleted = await this.UserModel.findByIdAndDelete(id)

    if (user_deleted){
      throw new NotFoundException(`The user with the id: ${id} wasn't found`)
    }

    return {
      status: HttpStatus.OK,
      data: user_deleted,
      message: `The user with the ID: ${id} was deleted sucesfully`
    }

  }
}
