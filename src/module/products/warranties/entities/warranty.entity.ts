import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { WarrantyStatus } from "src/common/warranty_status.enum";


@Schema({timestamps: true})
export class Warranty extends Document {

    @Prop()
    productSku: string; 

    @Prop()
    status: WarrantyStatus

    createdAt: Date; 

}


export const WarrantySchema = SchemaFactory.createForClass(Warranty)
