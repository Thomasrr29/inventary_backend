import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsStrongPassword } from "class-validator"


export class CreateUserDto {

    @ApiProperty()
    name: string
    
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
