import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { 
  UserDto, 
  completeProfileSchema, 
  profileUpdateSchema, 
  updatePasswordSchema
} from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';
import { ProductDto } from 'src/Products/dtos';
import { FileInterceptor } from '@nestjs/platform-express';

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
    return this.userService.updateAccount(req, updateInfo);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(profileUpdateSchema))
  @Patch('profile')
  updateUserProfile(@Req() req: Request, @Body() updateInfo: UserDto) {
    return this.userService.updateUserProfile(req, updateInfo);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(updatePasswordSchema))
  @Put('password')
  updatePassword(@Req() req: Request, @Body() passwordInfo: UserDto) {
    return this.userService.updatePassword(req, passwordInfo);
  }

  @Put('image')
  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UseInterceptors(
    FileInterceptor("profilePicture")
  )
  updateUserImage(
    @Req() req: Request,
    @UploadedFile() file
  ) {
    return this.userService.updateImage(req, file);
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

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Delete('favourite/:productId')
  removeFavoriteProduct(@Req() { user }: Request, @Param() { productId }: ProductDto) {    
    return this.userService.removeFavoriteProduct(user, productId);
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Get('admin')
  getAdminUsers() {
    return this.userService.getAdminUsers();
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Delete('admin/:userId')
  deleteAdmin(@Param() { userId }) {
    return this.userService.deleteAdmin(userId);
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Patch('admin/:userId/:status')
  updateAdminStatus(@Param() { userId, status }) {
    return this.userService.updateAdminStatus(userId, status);
  }
}
