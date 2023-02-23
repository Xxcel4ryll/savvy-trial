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
import { UserService } from '../services/user.service';
import { UserDto, completeProfileSchema, profileUpdateSchema } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';
import { ProductDto } from 'src/Products/dtos';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get()
  getUser(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(completeProfileSchema))
  @Put('account')
  updateUser(@Req() req: Request, @Body() updateInfo: UserDto) {
    return this.userService.updateAccount({ req, updateInfo });
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(profileUpdateSchema))
  @Put('image')
  updateUserImage(@Req() req: Request, @Body() updateInfo: UserDto) {
    return this.userService.updateAccount({ req, updateInfo });
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Post('favourite')
  favoriteProduct(@Req() {user}: Request, @Body() { productId }: ProductDto) {    
    return this.userService.favoriteProduct(user, productId);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get('favourite')
  viewFavoriteProduct(@Req() { user }: Request) {    
    return this.userService.viewFavoriteProduct(user);
  }
}
