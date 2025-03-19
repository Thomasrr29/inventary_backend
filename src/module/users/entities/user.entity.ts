import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { AccountType } from "src/common/account_type_enum";

@Schema({timestamps: true})
export class User extends Document {

    @Prop({
        minlength: 4,
        maxlength: 22
    })
    name: string

    @Prop()
    email: string 

    @Prop({
        minlength: 8,
        maxlength: 64
    })
    password: string

    @Prop({
        default: AccountType.USER
    })
    accountType: AccountType

    createdAt: Date
    updateAt: Date

}

export const UserSchema = SchemaFactory.createForClass(User)