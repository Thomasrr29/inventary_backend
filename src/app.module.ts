import { Module } from '@nestjs/common';
import { ProductModule } from './module/products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './module/users/users.module';

@Module({
  
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>("DB_MONGO_URL")
      }),
      inject: [ConfigService]
    }),
    
    ProductModule, UsersModule],
  
})


export class AppModule {}
