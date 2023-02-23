import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

import Paystack from './paystack';

@Injectable()
export class PaystackService {
  paymentProvider = new Paystack();

  constructor() {
    this.paymentProvider = new Paystack();
  }

  /**
   * Generate user
   * @param {object} customer
   */
  async customer(customer) {
    try {
      return await this.paymentProvider.createCustomer(customer);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          name: 'InternalServerError',
          error: 'Oops! An error occured while creating customer',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Fetch user
   * @param {object} customer
   */
  async fetchCustomer(customer) {
    try {
      return await this.paymentProvider.fetchCustomer(customer);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          name: 'InternalServerError',
          error: 'Oops! An error occured while fetching a customer',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Generate dedicated virtual account
   * @param {object} customer
   */
  async generate(customer) {
    try {
      return await this.paymentProvider.generateWallet(customer);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          name: 'InternalServerError',
          error: 'Oops! An error occured while generating virtual wallet',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async cardDeposit(card) {
    try {
      return await this.paymentProvider.cardDeposit(card);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          name: 'InternalServerError',
          error: 'Oops! An error occured while initializing deposit',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async verifyTransaction(reference) {
    try {
      return await this.paymentProvider.verifyTransaction(reference);
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          name: 'InternalServerError',
          error: 'Oops! An error occured while verifing transaction',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  /**
   * Fetch all available banks
   * @param {object} account
   */
  async banks() {
    try {
      // return this.paymentProvider.availableBanks();
    } catch (e) {
      throw new HttpException(
        {
          statusCode: HttpStatus.SERVICE_UNAVAILABLE,
          name: 'InternalServerError',
          error: 'Oops! An error occured while fetching banks',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
