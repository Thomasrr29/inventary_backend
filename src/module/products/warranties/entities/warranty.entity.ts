import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { WarrantyStatus } from "src/common/warranty_status.enum";


@Schema()
export class Warranty {

    @Prop()
    id: number

    @Prop()
    productId: number; 

    @Prop()
    createdAt: Date; 

    @Prop()
    status: WarrantyStatus

}


export const WarrantySchema = SchemaFactory.createForClass(Warranty)
