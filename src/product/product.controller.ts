import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto'
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productService.createProduct(createProductDTO)
    return res.status(HttpStatus.OK).json({
      message: 'Product Successfully Created',
      product
    })
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts()
    return res.status(HttpStatus.OK).json({
      products
    })
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID)
    if (!product) throw new NotFoundException('Product Does not exists')
    return res.status(HttpStatus.OK).json(product)
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const productDeleted = await this.productService.deletedProduct(productID)
    if (!productDeleted) throw new NotFoundException('Product Does not exists')
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted successfully',
      productDeleted
    })
  }

}
