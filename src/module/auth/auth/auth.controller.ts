import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from "@nestjs/passport"
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}


    @UseGuards(AuthGuard('LocalStrategy'))
    @Post("/login")
    async loginUser(
        @Req() req: Request
    ){
        return this.authService.login(req.user)
    }
}
