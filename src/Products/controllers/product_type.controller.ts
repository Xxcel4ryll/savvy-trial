import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ProductTypeService } from '../services/product_type.service';
import { ProductTypeDto, productTypeSchema } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';

@Controller('product/types')
export class ProductTypeController {
  constructor(private productTypeService: ProductTypeService) {}

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get()
  getProductTypes(@Req() req: Request) {
    return this.productTypeService.find(req.query);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(productTypeSchema))
  @Post()
  createProductType(@Body() productType: ProductTypeDto) {
    return this.productTypeService.create(productType);
  }
}
