import { ApiProperty } from "@nestjs/swagger";



export class CreateItemsDto {

    @ApiProperty({
        description:"The product SKU"
    })
    sku: string;

    @ApiProperty()
    name: string;

    @ApiProperty({
        description:"The product have variations or not"
    })
    variableProduct: boolean;

    @ApiProperty({
        description:"The product is a variation"
    })
    parentId: string;

    @ApiProperty()
    quantity: number;
    
    @ApiProperty()
    price: number; 
}
