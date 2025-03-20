import { Injectable} from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local"
import { AuthService } from "../auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "LocalStrategy"){
    
    constructor(private authService: AuthService){
        super({
             usernameField: "name"
        })
    }

    async validate(name: string, password: string): Promise<any>{

        const user = await this.authService.validateUser({name, password})
        return user

    }

}