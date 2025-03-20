import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

@Schema({timestamps: true})
export class Items extends Document {

    @Prop({required: true})
    sku: string;

    @Prop({required: true})
    name: string;   

    @Prop({default: false}) 
    variableProduct: boolean;

    @Prop({type: Types.ObjectId, ref: "Items", default: null})
    parentId?: Types.ObjectId;

    @Prop({default: 1})
    quantity: number;

    @Prop()
    price: number;

    createdAt: Date;
    updatedAt: Date;

}

export const ItemsSchema = SchemaFactory.createForClass(Items); 
