import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Items {

    @Prop()
    id: number; 

    @Prop()
    sku: string;

    @Prop()
    name: string;   

    @Prop() 
    variableProduct: boolean;

    @Prop()
    parentCode: string;

    @Prop()
    quantity: number;

    @Prop()
    price: number;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;

}

export const ItemsSchema = SchemaFactory.createForClass(Items); 
