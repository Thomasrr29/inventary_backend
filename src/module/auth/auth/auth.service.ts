import { Injectable} from '@nestjs/common';
import { UsersService } from 'src/module/users/users.service';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService 
    ){}

    async validateUser(loginUserDto: LoginUserDto): Promise<any>{

        const {name, password} = loginUserDto

        const user = (await this.usersService.findByName(name)).data

        if (user && await bcrypt.compare(password, user.password)) {
        
            const {password, ...result} = user
            return result
        }

        return null

    }

    async login(user: any){
        
        const payload = {username: user.name, sub: user._id}

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
