import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto, productSchema } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get()
  getProducts(@Req() req: Request) {
    return this.productService.find(req.query);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(productSchema))
  @Post()
  createProduct(@Req() req: Request, @Body() product: ProductDto) {
    return this.productService.create(product);
  }
}
