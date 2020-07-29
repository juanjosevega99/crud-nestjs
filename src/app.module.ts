import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';

import { TypegooseModule } from 'nestjs-typegoose'
import configuration from './config/config';
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ProductModule, 
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypegooseModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongoURI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
