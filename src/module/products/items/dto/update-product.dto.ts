import { PartialType } from '@nestjs/mapped-types';
import { CreateItemsDto } from './create-product.dto';

export class UpdateItemsDto extends PartialType(CreateItemsDto) {
    
}
