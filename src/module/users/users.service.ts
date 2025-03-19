import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/pagination_dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name) private UserModel: Model<User>){}

  async create(createUserDto: CreateUserDto): Promise<Object> {

    const user_existence = await this.UserModel.findOne({name: createUserDto.name})

    if (user_existence){
      throw new Error(`The user with the name ${createUserDto.name} already exists`)
    }

    const userCreated = await this.UserModel.create(createUserDto)

    return {
      status: HttpStatus.CREATED,
      data: await userCreated.save(),
      message: `The user ${createUserDto.name} was created sucesfully `
    }


  }

  async findAll(
    paginationDto: PaginationDto
  ): Promise<Object> {

    const {skip, limit} = paginationDto

    const users = await this.UserModel
    .find()
    .skip(skip)
    .limit(limit)
    .exec()

    return {
      status: HttpStatus.OK,
      data: users,
      message: "Users found sucessfully"
    }
  }

  async findOneById(id: string): Promise<Object> {
  
    const user_by_id = await this.UserModel.findById(id)

    if (!user_by_id){
      throw new Error(`User with the ID: ${id} wasn't found`)
    }

    return user_by_id

  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Object> {

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

  async remove(id: string): Promise<Object> {
    
    const user_deleted = await this.UserModel.findByIdAndDelete(id)

    if (user_deleted){
      throw new Error(`The user with the id: ${id} wasn't found`)
    }

    return {
      status: HttpStatus.OK,
      message: `The user with the ID: ${id} was deleted sucesfully`
    }

  }
}
