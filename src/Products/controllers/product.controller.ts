import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { ProductDto, UpdateRentStart, productSchema, startRentSchema, updateProductSchema, updateQuantity } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get()
  getProducts(@Req() req: Request) {
    return this.productService.find(req.user, req.query);
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Get('admin')
  getAllProducts(@Req() req: Request) {
    return this.productService.findAll(req.query);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'mainImage', maxCount:1},
      { name: 'productImages', maxCount: 4},
    ])
  )
  createProduct(@Req() req: Request, 
  @UploadedFiles() files:{ 
    mainImage: Express.Multer.File[], 
    productImages: Express.Multer.File[]
  },
  @Body(
    new JoiValidationPipe(productSchema)
  ) product: ProductDto) {
    
    return this.productService.create(req.user,product, files);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(updateProductSchema))
  @Put()
  updateProduct(@Req() req: Request, @Body() product: ProductDto) {
    return this.productService.update(product);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get('search/')
  searchProduct(@Req() req: Request) {    
    return this.productService.search(req.user, req.query.search);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get(':productId')
  viewProduct(@Req() req: Request, @Param() { productId }: ProductDto) {        
    return this.productService.view(req.user, productId);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Delete(':productId')
  async deleteProduct(@Param() { productId }) {
    const data =  await this.productService.deleteProduct(productId);
    return {
      message: `Product: ${productId} deleted succesfully`
    }
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @UsePipes(new JoiValidationPipe(startRentSchema))
  @Patch('admin/:productId')
  async updateRentProduct(@Req() req: Request, @Param() { productId }, @Body() payload: UpdateRentStart) {
    const data = await this.productService.addRentConfirmTime(productId, payload)

    return {
      status: HttpStatus.OK,
      message: "Rent date for product has been triggered.",
    }
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Patch('admin/quantity/:productId')
  @UsePipes(new JoiValidationPipe(updateQuantity))
  async updateProducQuantity(@Req() req: Request, @Param() { productId }, @Body() payload) {
    const data = await this.productService.increaseProductQuantity(productId, payload)

    return {
      status: HttpStatus.OK,
      message: "Quanity for product has been updated.",
    }
  }
}
