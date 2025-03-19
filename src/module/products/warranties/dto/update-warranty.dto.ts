import { PartialType } from '@nestjs/mapped-types';
import { CreateWarrantyDto } from './create-warranty.dto';

export class UpdateWarrantyDto extends PartialType(CreateWarrantyDto) {}
