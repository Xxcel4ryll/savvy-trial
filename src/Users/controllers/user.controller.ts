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
  Query,
  Req,
  UploadedFile,
  UploadedFiles,
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
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { adminRegisterSchema } from 'src/Authentication/dtos';
import { FindDataRequestDto } from 'src/dto/request/find.data.request.dto';
import { calculate_query_params } from 'src/utils/helper';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get()
  getUser(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  // @UsePipes(new JoiValidationPipe(completeProfileSchema))
  @Put('account')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'bvn', maxCount: 1 },
      { name: 'id', maxCount: 1 },
    ]),
  )
  async updateUser(@Req() req: Request, 
  @UploadedFiles() files: { bvn?: Express.Multer.File[], id?: Express.Multer.File[] }, 
  @Body() updateInfo: UserDto) {
    console.log(updateInfo);
    
    return this.userService.updateProfile(req, files, updateInfo);
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
  @Get(':type')
  getUsers(@Param() { type }) {
    return this.userService.getUsers(type);
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Post('admin')
  createAdminUser(@Body(
    new JoiValidationPipe(adminRegisterSchema)
  ) admin: UserDto) {
    return this.userService.createAdminUser(admin);
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

  @UseGuards(RoleGuard([Roles.Admin]))
  @Get('allUsers/fetch/byType')
  async getAllUsers(@Query() query:FindDataRequestDto) {
    const calculatedQuery = calculate_query_params(query);

    const {
      current_page,
      total_items,
      data_response: data,
      total_pages,
    } = await this.userService.allUsers(calculatedQuery, query.type);
    return {
      status: HttpStatus.OK,
      message: 'Users retrieved successfully',
      data,
      meta: {
        total_items,
        total_pages,
        current_page,
      },
    };
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Get('allUsers/fetch/byKyc')
  async getAllKYCUsers(@Query() query:FindDataRequestDto) {
    const calculatedQuery = calculate_query_params(query);
    const {
      current_page,
      total_items,
      data_response: data,
      total_pages,
    } = await this.userService.allKYCUSers(calculatedQuery, query.type);
    return {
      status: HttpStatus.OK,
      message: 'KYC Users retrieved successfully',
      data,
      meta: {
        total_items,
        total_pages,
        current_page,
      },
    };
  }

  @UseGuards(RoleGuard([Roles.Admin]))
  @Get('admin/user/:id')
  async getUserDetails(@Param() { id }) { 
    return await this.userService.find({id: id})
  }
}
