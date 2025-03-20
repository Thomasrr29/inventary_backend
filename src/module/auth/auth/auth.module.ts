import { Inject, Module } from "@nestjs/common";
import { UsersModule } from "src/module/users/users.module";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "../strategies/local.strategy";
import { PassportModule } from "@nestjs/passport";
import { AuthController } from './auth.controller';
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        UsersModule, 
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>("JWT_SECRET"),
                    signOptions: {expiresIn: "10d"}
                }
            }  
        }),
        PassportModule],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController],
    exports: [JwtModule]
})

export class AuthModule {}