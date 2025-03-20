import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { WarrantyStatus } from "src/common/warranty_status.enum";


@Schema({timestamps: true})
export class Warranty extends Document {

    @Prop({type: Types.ObjectId, ref: "Items", required: true})
    productId: Types.ObjectId; 

    @Prop()
    status: WarrantyStatus

    createdAt: Date; 

}


export const WarrantySchema = SchemaFactory.createForClass(Warranty)
