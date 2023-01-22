import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto, completeProfileSchema } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';

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
}
