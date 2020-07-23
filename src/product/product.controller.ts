import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body } from '@nestjs/common';

@Controller('product')
export class ProductController {

  @Post('/create')
  createPost(@Res() res, @Body() createProductDTO) {
    return res.status(HttpStatus.OK).json({
      message: 'received'
    })
  }

}
