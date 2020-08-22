import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ConfigModule } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [ConfigModule, TypegooseModule.forFeature([ProductModule])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
