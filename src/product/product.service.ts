import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'

import { Product } from './interfaces/product.interface'
import { CreateProductDTO } from './dto/product.dto';

@Injectable()
export class ProductService {

  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find()
    return products
  }

  async getProduct(productID: string): Promise<Product> {
    const product = await this.productModel.findById(productID)
    return product
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = new this.productModel(createProductDTO)
    return await product.save()
    
  }

  async deletedProduct(productID: string): Promise<Product> {
    const deletedProduct = await this.productModel.findOneAndDelete({ _id: productID})
    return deletedProduct
  }
  
  async updatedProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product> {
    const updatedProduct = await this.productModel.findOneAndUpdate({ _id: productID }, createProductDTO, { new: true })
    return updatedProduct
  }

}
