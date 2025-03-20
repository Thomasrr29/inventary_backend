import { Module } from '@nestjs/common';
import { ProductModule } from './module/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import * as Joi from "joi"
import { AuthGuard } from './module/auth/guards/auth.guard';

@Module({
  
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
        validationSchema: Joi.object({
          DB_MONGO_URL: Joi.string().required(),
          JWT_SECRET: Joi.string().required()
        })
      }
    ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("DB_MONGO_URL")
      }),
      inject: [ConfigService]
    }),
    ProductModule, 
    UsersModule, 
    AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
  
})


export class AppModule {}
