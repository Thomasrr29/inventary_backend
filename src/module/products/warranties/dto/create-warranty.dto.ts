import { ApiProperty } from "@nestjs/swagger";
import { WarrantyStatus } from "src/common/warranty_status.enum"

export class CreateWarrantyDto {

    @ApiProperty()
    productId: number; 
    
    @ApiProperty()
    createdAt: Date; 
    
    @ApiProperty()
    status: WarrantyStatus
}
