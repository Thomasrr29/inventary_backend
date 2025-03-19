import { Module } from '@nestjs/common';
import { WarrantiesService } from './warranties.service';
import { WarrantiesController } from './warranties.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Warranty, WarrantySchema } from './entities/warranty.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Warranty.name, schema: WarrantySchema}])],
  controllers: [WarrantiesController],
  providers: [WarrantiesService],
})
export class WarrantiesModule {}
