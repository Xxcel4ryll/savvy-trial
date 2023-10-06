import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TransactionService } from '../services/transaction.service';
import { paymentSchema, transactionsSchema, verifyPaymentSchema } from '../dtos/index';
import { JoiValidationPipe } from 'src/Globals/providers/validate/validate.pipe';
import Roles from 'src/Globals/role.enum';
import RoleGuard from 'src/Globals/Guards/role.guard';
import { Request } from 'express';
import { FindDataRequestDto } from 'src/dto/request/find.data.request.dto';
import { calculate_query_params } from 'src/utils/helper';

@Controller('transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(transactionsSchema))
  @Get()
  getTransactions(@Req() req: Request) {
    return this.transactionService.transactions(req.user, req?.query);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @Get('wallet')
  getWallet(@Req() req: Request) {
    return this.transactionService.wallet(req.user);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(paymentSchema))
  @Post('payment')
  payment(@Req() req: Request, @Body() payload: object) {
    return this.transactionService.payment(req.user, payload);
  }

  @UseGuards(RoleGuard([Roles.Admin, Roles.User]))
  @UsePipes(new JoiValidationPipe(verifyPaymentSchema))
  @Post('verify')
  verifyPayment(@Req() req: Request, @Body() payload: object) {
    return this.transactionService.verify(req.user, payload);
  }

  @Post('webhook/paystack')
  transactionWebhook(@Body() webhook: object) {
    return this.transactionService.transactionWebhook(webhook);
  }


  @UseGuards(RoleGuard(Roles.Admin))
  @Get('products')
  async fetchPurchaseProduct(@Query() query: FindDataRequestDto) {
    const calculatedQuery = calculate_query_params(query);
    const {
      current_page,
      total_items,
      data_response: data,
      total_pages,
    } = await this.transactionService.getPurchasedProducts(calculatedQuery, query.type)
    return {
      status: HttpStatus.OK,
      message: 'Purchased Products retrived successfuly',
      data,
      meta: {
        total_items,
        total_pages,
        current_page
      }
    }
  }
}
