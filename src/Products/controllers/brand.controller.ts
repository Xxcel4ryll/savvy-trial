import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { BrandDto, BrandSchema } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';

@Controller('brands')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Get()
  getBrands(@Req() req: Request) {    
    return this.brandService.find(req.query);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(BrandSchema))
  @Post()
  createBrand(@Req() req: Request, @Body() brandPayload: BrandDto) {
    return this.brandService.create(brandPayload);
  }
}
