import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {

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

    @Prop()
    createdAt: Date

}

export const UserSchema = SchemaFactory.createForClass(User)