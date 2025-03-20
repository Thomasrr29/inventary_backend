import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword } from "class-validator"
import { AccountType } from "src/common/account_type_enum"

export class CreateUserDto {

    @ApiProperty()
    username: string
    
    @ApiProperty()
    @IsEmail()
    email: string 
    
    @ApiProperty()
    @IsStrongPassword()
    password: string
    
    @ApiProperty({
        enum: AccountType,
        enumName: "Account type"
    })
    accountType: AccountType

}
