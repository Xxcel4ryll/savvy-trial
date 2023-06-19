import { Body, Controller, Delete, Get, Param, Post, UsePipes } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JoiValidationPipe } from '../../Globals/providers/validate/validate.pipe';
import {
  LoginDto,
  RegisterDto,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  forgotPasswordSchema,
  FindUserDto,
  ResetPasswordDto,
  adminRegisterSchema,
} from '../dtos/index';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('status')
  status() {
    return {
      status: true,
      message: 'Savvy backend alright'
    };
  }

  @UsePipes(new JoiValidationPipe(loginSchema))
  @Post('login')
  signIn(@Body() auth: LoginDto) {
    return this.authService.signIn(auth);
  }

  @UsePipes(new JoiValidationPipe(registerSchema))
  @Post('register')
  register(@Body() auth: RegisterDto) {
    return this.authService.signUp(auth);
  }

  @Post('admin')
  createAdmin(@Body(
    new JoiValidationPipe(adminRegisterSchema)
  ) auth: RegisterDto) {
    return this.authService.signUp(auth);
  }

  @UsePipes(new JoiValidationPipe(forgotPasswordSchema))
  @Post('forgot')
  forgot(@Body() auth: FindUserDto) {
    return this.authService.forgotPassword(auth);
  }

  @UsePipes(new JoiValidationPipe(resetPasswordSchema))
  @Post('reset')
  reset(@Body() auth: ResetPasswordDto) {
    return this.authService.resetPassword(auth);
  }
}
